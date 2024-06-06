import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useField } from 'formik';

import ControlLabel from '~/components/UI/ControlLabel/ControlLabel';
import ControlMessage from '~/components/UI/ControlMessage/ControlMessage';
import Spinner from '../Spinner/Spinner';
import { Item, SelectboxProps } from './Selectbox.types';
import SelectboxContext from './SelectboxContext';
import SelectboxSearch from './SelectboxSearch';

import styles from './Selectbox.module.scss';

const isUnique = (value: string, index: number, array: string[]) =>
  array.indexOf(value) === array.lastIndexOf(value);

const preprocessValue = (value: string | string[]): string[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
};

const preprocessItems = (items: Item[]) =>
  items.map((el) => ({ ...el, value: el.value.toString() }));

const Selectbox: React.FC<SelectboxProps> = ({
  onSelect,
  placeholder,
  shownValue,

  size,
  multiselect,
  renderOptionFunction,
  icon = '/images/icons/selectbox-arrow.svg',
  clearable,
  clearableText,
  items: itemsPassed,
  search,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const [items, setItems] = useState(preprocessItems(itemsPassed));
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(preprocessItems(itemsPassed));
  }, [itemsPassed]);

  const [isOpen, setIsOpen] = useState(false);
  const selectedItemValues = preprocessValue(field.value);
  const id = useId();

  if (!items.map((item) => item.value).every(isUnique))
    throw new Error('Every item should have unique value field');
  if (
    selectedItemValues.length &&
    !items.map(({ value }) => value).includes(selectedItemValues[0])
  )
    throw new Error('Invalid default value');

  const closeSelectbox = (event: MouseEvent, forceClose = false) => {
    const target = event.target as Element;

    if (!target.closest(`[id="${id}"]`) || forceClose) {
      setIsOpen(false);
      document.body.removeEventListener('click', closeSelectbox);
    }
  };

  const clickHandler = () => {
    if (!isOpen) {
      document.body.addEventListener('click', closeSelectbox);
    } else if (multiselect) return;

    setIsOpen(!isOpen);
  };

  const renderItem = (item: Item) =>
    typeof shownValue === 'function' ? shownValue(item) : item[shownValue];

  const onItemClick = (itemValue: string) => {
    let newSelectedValues = [...selectedItemValues];
    const selectedIndex = selectedItemValues.findIndex(
      (value) => value === itemValue,
    );

    if (selectedIndex !== -1) {
      newSelectedValues.splice(selectedIndex, 1);
    } else {
      newSelectedValues.push(itemValue);
    }

    // Clear selected items list if all items are selected
    if (newSelectedValues.length === items.length) {
      newSelectedValues = [];
    }

    helpers.setValue(multiselect ? newSelectedValues : itemValue);

    onSelect?.(multiselect ? newSelectedValues : itemValue);
  };

  const error = meta.touched && meta.error;
  const success =
    meta.touched &&
    !meta.error &&
    props.showSuccessMessage &&
    props.successMessage;

  let selectedText = placeholder || 'Select';

  if (selectedItemValues[0] !== undefined) {
    selectedText = multiselect
      ? items
          .filter((el) => selectedItemValues.includes(el.value))
          .map((el) => el.name)
          .join(', ')
      : renderItem(
          items.find((item: Item) =>
            selectedItemValues.includes(`${item.value}`),
          ) as Item,
        );
  }

  const clearValues = () => {
    helpers.setValue(multiselect ? [] : null);

    onSelect?.([]);
  };

  const contextValue = useMemo(
    () => ({
      items: itemsPassed,
      setItems,
      setIsLoading,
    }),
    [itemsPassed],
  );
  const handleFocus = () => {
    setTimeout(() => setIsOpen(true), 100);
  };
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!selectRef.current?.contains(e.relatedTarget as Node)) {
      setTimeout(() => setIsOpen(false), 100);
    }
  };

  return (
    <SelectboxContext.Provider value={contextValue}>
      <ControlLabel {...props} id={id} />
      <div
        role='combobox'
        aria-controls='select-box'
        aria-expanded={isOpen}
        tabIndex={0}
        onClick={clickHandler}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={selectRef}
        id={id}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            clickHandler();
          }
        }}
        className={cn(styles.selectBox, {
          [styles.open]: isOpen,
          [styles[`size-${size}`]]: size,
        })}
        {...props}
        title={error || success || ''}
      >
        <input type='hidden' {...field} value={selectedItemValues} />
        <div
          role='tablist'
          tabIndex={0}
          className={cn(styles.box, {
            [styles.error]: error,
          })}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              // @ts-expect-error: Mix of React events with DOM events
              closeSelectbox(e, true);
            }
          }}
          // @ts-expect-error: Mix of React events with DOM events
          onClick={(e) => closeSelectbox(e, true)}
        >
          <div className={styles.selectedItem}>{selectedText}</div>
          {icon && (
            <div className={styles.icon}>
              <Image src={icon} width={20} height={20} alt='open select' />
            </div>
          )}
        </div>
        <div className={styles.selectBox__list}>
          {clearable && (
            <button
              type='button'
              className={cn(
                styles.selectBox__item,
                styles.selectBox__itemClear,
                {
                  [styles['selectBox__item-selected']]:
                    !selectedItemValues.length,
                },
              )}
              onClick={clearValues}
            >
              {clearableText || 'Show all'}
            </button>
          )}
          {search && <SelectboxSearch {...search} />}
          {isLoading ? (
            <div className={styles.selectBox__item}>
              <Spinner customClass={styles.selectBox__loader} />
            </div>
          ) : (
            items.map((item, index) =>
              renderOptionFunction ? (
                <div
                  role='row'
                  tabIndex={0}
                  key={item.value}
                  className={cn(styles.selectBox__item, {
                    // isSelected check
                    [styles['selectBox__item-selected']]:
                      selectedItemValues.includes(item.value),
                  })}
                  onClick={() => onItemClick(item.value)}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                      onItemClick(item.value);
                    }
                  }}
                >
                  {renderOptionFunction(
                    item,
                    index,
                    selectedItemValues.includes(item.value),
                  )}
                </div>
              ) : (
                <div
                  role='row'
                  tabIndex={0}
                  className={cn(styles.selectBox__item, {
                    // isSelected check
                    [styles['selectBox__item-selected']]:
                      selectedItemValues.includes(item.value),
                  })}
                  onClick={() => onItemClick(item.value)}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                      onItemClick(item.value);
                    }
                  }}
                  key={item.value}
                >
                  {renderItem(item)}
                </div>
              ),
            )
          )}
        </div>
      </div>
      <ControlMessage text={error || success || ''} success={!!success} />
    </SelectboxContext.Provider>
  );
};

export default Selectbox;
