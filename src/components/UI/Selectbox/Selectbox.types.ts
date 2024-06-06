export interface Item {
  value: string;
  name: string;
}

export interface SelectboxProps {
  items: Item[];
  onSelect?: (selectedItemValue: string | string[]) => void;
  placeholder?: string;
  shownValue: keyof Item | ((item: Item) => string);
  label?: string;
  size?: 'sm' | 'xs';
  multiselect?: boolean;
  renderOptionFunction?: (
    item: Item,
    itemIndex: number,
    isSelected: boolean,
    onClickCallback?: (itemIndex: number) => void,
  ) => React.ReactNode;
  icon?: string;
  clearable?: boolean;
  clearableText?: string;
  name: string;
  showSuccessMessage?: boolean;
  successMessage?: string;
  required?: boolean;
  search?: SearchProps | undefined;
}

export interface SearchProps {
  searchFunction: (items: Item[], query: string) => Item[] | Promise<Item[]>;
  placeHolder?: string;
}

export interface SelectboxContextProps {
  items: Item[];
  setItems: (items: Item[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}
