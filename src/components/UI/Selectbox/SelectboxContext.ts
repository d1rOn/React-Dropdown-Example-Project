import { createContext } from 'react';

import { SelectboxContextProps } from './Selectbox.types';

const SelectboxContext = createContext<SelectboxContextProps>({
  items: [],
  setItems: () => {},
  setIsLoading: () => {},
});

export default SelectboxContext;
