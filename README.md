# Selectbox Component

---

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
  - [Using npm](#using-npm)
  - [Using Docker](#using-docker)
- [Usage](#usage)

---

## Description

The `Selectbox` component is a customizable and versatile dropdown component that supports single and multi-select functionalities. It is designed to handle various use cases, including search functionality, custom rendering of options, and display of success messages.

## Props

### SelectboxProps

- `items: Item[]`
  - A list of options available in the select box. Each item should have a unique `value` and a `name`.

- `onSelect?: (selectedItemValue: string | string[]) => void`
  - A callback function that is called when an item is selected. For multi-select, it returns an array of selected values.

- `placeholder?: string`
  - A string that is shown when there are no selected items.

- `shownValue: keyof Item | ((item: Item) => string)`
  - A key of the item object that will be shown or a function that receives an item object and returns a string to be shown as an option or selected value.

- `label?: string`
  - Label text shown below the select box.

- `size?: 'sm' | 'xs'`
  - Size of the select box. The default size is larger than `sm`.

- `multiselect?: boolean`
  - Allows selecting multiple items if set to `true`.

- `renderOptionFunction?: (
    item: Item,
    itemIndex: number,
    isSelected: boolean,
    onClickCallback?: (itemIndex: number) => void,
  ) => React.ReactNode`
  - Defines how options will be rendered. It receives the item object, item index, a boolean indicating if the item is selected, and an optional click callback.

- `icon?: string`
  - Path to the arrow image.

- `clearable?: boolean`
  - If `true`, the select box will have a 'Clear' option.

- `clearableText?: string`
  - Text to show in the 'Clear' option.

- `name: string`
  - Name of the select box, used for form submissions.

- `showSuccessMessage?: boolean`
  - If `true`, a success message will be shown upon selection.

- `successMessage?: string`
  - The success message text to display if `showSuccessMessage` is `true`.

- `required?: boolean`
  - If `true`, the select box will be required.

- `search?: SearchProps | undefined`
  - Search functionality configuration.

### Item

- `value: string`
  - The unique value of the item.

- `name: string`
  - The display name of the item.

### SearchProps

- `searchFunction: (items: Item[], query: string) => Item[] | Promise<Item[]>`
  - A function that handles the search logic. It receives the list of items and the search query, returning the filtered items.

- `placeHolder?: string`
  - Placeholder text for the search input.

### SelectboxContextProps

- `items: Item[]`
  - List of items in the context.

- `setItems: (items: Item[]) => void`
  - Function to set the items in the context.

- `setIsLoading: (isLoading: boolean) => void`
  - Function to set the loading state in the context.

---

## Installation

### Using npm

1. **Clone the repository:**
    ```bash
    git clone https://gl.zagroza.agency/zagroza-internal-projects/portfolio/react-dropdown-example.git
    cd react-dropdown-example/src
    ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Start the application:**
    ```bash
    npm start
    ```

4. **Open your browser and navigate to:**
    ```bash
    http://localhost:3000
    ```

### Using Docker

1. **Clone the repository:**
    ```bash
    git clone ttps://gl.zagroza.agency/zagroza-internal-projects/portfolio/react-dropdown-example.git
    cd react-dropdown-example
    ```

2. **Build the Docker image:**
    ```bash
    docker-compose -f docker-compose.dev.yml up --build -d
	# or
    docker-compose -f docker-compose.yml up --build -d
    ```

3. **Open your browser and navigate to:**
    ```bash
    http://127.0.0.1:3009/
    ```
---

## Usage
Once the application is running, you can fill the form and see how it works!

---

## Contact
For any inquiries, please reach out to us at [andrii.trubai@zagroza.agency](mailto:andrii.trubai@zagroza.agency).

---

