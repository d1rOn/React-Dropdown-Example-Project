import React, { useContext } from 'react';
import cn from 'classnames';

import { SearchProps } from './Selectbox.types';
import SelectboxContext from './SelectboxContext';

import styles from './Selectbox.module.scss';

const SelectboxSearch: React.FC<SearchProps> = ({
  placeHolder,
  searchFunction,
}) => {
  const { items, setItems, setIsLoading } = useContext(SelectboxContext);

  return (
    <div className={cn(styles.selectBox__item, styles.selectBox__searchItem)}>
      <input
        type='text'
        placeholder={placeHolder}
        onClick={(e) => e.stopPropagation()}
        onChange={async (e) => {
          setIsLoading(true);
          const newItems = await searchFunction(items, e.target.value);
          setIsLoading(false);
          setItems(newItems);
          return true;
        }}
      />
    </div>
  );
};

export default SelectboxSearch;
