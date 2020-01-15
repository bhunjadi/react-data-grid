# Forked React Data Grid

This is a forked [react-data-grid](https://github.com/adazzle/react-data-grid) (v7.0.0-alpha.22).

Added features:
- multiple column sorting
- keeping all rows in DOM (no recycling)
- option `ignoreScrollbarSize` which affects ColumnMetrics calculation (for grids without scrollbar)
- column option `cellTitle` which can provide title for the cell
- passing initial filters to grid
- `cellContext` prop which is passed to cell formatter
- `renderSortableCellContent` prop overrides default content of `SortableHeaderCell` allowing customization of sort arrow

## Multiple column sorting

Example

```js

handleMultipleColumnSort(sort) {
  /**
   * sort will be an array
   * for empty sort, sort will still be array with length === 0
   * each object of array is like {column, direction} where column is column.key from columns definition
   * */
}

render() {
  return (
    <ReactDataGrid
      multipleColumnsSort
      onGridMultipleColumnsSort={this.handleMultipleColumnSort}

      // optionally (default: false)
      // this forces user to press Ctrl (or Cmd on Mac OS) to be able to do multiple sort, 
      // without Ctrl it would overwrite the last value and act as single sort (but still pass an array to handleMultipleColumnsSort)
      requireCtrlForMultipleColumnsSort
      ...
    />
  );
```

## Keep all rows in DOM

Example

```js
<ReactDataGrid
  keepAllRowsInDOM
  ...
>
```

Can be useful if for example you are using expandable rows, etc.

# React Data Grid [![npm-badge]][npm-url] [![azure-badge]][azure-url] [![coverage-badge]][azure-url]

[npm-badge]: https://img.shields.io/npm/v/react-data-grid/next.svg
[npm-url]: https://www.npmjs.com/package/react-data-grid
[azure-badge]: https://img.shields.io/azure-devops/build/nstepi181/e5b746e6-be62-4d36-896f-1e636f889cdc/1/next.svg?logo=pipelines&style=flat-square
[coverage-badge]: https://img.shields.io/azure-devops/coverage/nstepi181/react-data-grid/1/next.svg?style=flat-square
[azure-url]: https://dev.azure.com/nstepi181/react-data-grid/_build/latest?definitionId=1&branchName=next

Excel-like grid component built with React, with editors, keyboard navigation, copy &amp; paste, and the like

## Install

```sh
npm install react-data-grid
```

## Usage

```jsx
import ReactDataGrid from 'react-data-grid';

const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }];
const rows = [{ id: 1, title: 'Title 1' }, ...];
const rowGetter = rowNumber => rows[rowNumber];

const Grid = () => {
  return <ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={rows.length}
    minHeight={500} />);
}
```

## Exports
Aside from the grid this package exports:

name                   | source                                  |
-----------------------|-----------------------------------------|
RowComparer            | [RowComparer](./src/RowComparer.js)     |
RowsContainer          | [RowsContainer](./src/RowsContainer.js) |
Row                    | [Row](./src/Row.js)                     |
Cell                   | [Cell](./src/Cell.js)                   |
HeaderCell             | [HeaderCell](./src/HeaderCell.js)       |
shapes                 | [shapes](./src/PropTypeShapes)          |
_helpers               | [_helpers](./src/helpers)               |
