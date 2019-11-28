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


http://adazzle.github.io/react-data-grid/
![react-data-grid](https://cloud.githubusercontent.com/assets/1432798/7348812/78063bd6-ecec-11e4-89d5-ffd327721cd7.PNG)


Overview
--------
ReactDataGrid is an advanced JavaScript spreadsheet-like grid component built using React

Installation
------------
The easiest way to use react-data-grid is to install it from npm and build it into your app with Webpack.
```sh
npm install react-data-grid
```

You can then import react-data-grid in your application as follows:
```js
import ReactDataGrid from 'react-data-grid';
```

Versions In This Repository
--------

- [master](https://github.com/adazzle/react-data-grid/commits/master) - commits that will be included in the next _minor_ or _patch_ release
- [next](https://github.com/adazzle/react-data-grid/commits/next) - commits that will be included in the next _major_ release (breaking changes)

Most PRs should be made to **master**, unless you know it is a breaking change.

To install the latest **unstable** version, you can run
```sh
npm install react-data-grid@next
```

Themes
------
We use [Bootstrap](https://github.com/twbs/bootstrap). If you want your Grid to get the "default" styling like the picture above, you'll need to include it separately.

```sh
npm install bootstrap
```
and then import the css from the dist folder when bootstrapping your application
```js
import 'bootstrap/dist/css/bootstrap.css';
```

Migrations
--------
If you intend to do a major release update for you react-data-grid check [the migration documents](migrations).

Features
--------

- Lightning fast virtual rendering
- [Can render hundreds of thousands of rows with no lag](http://adazzle.github.io/react-data-grid/#/examples/one-million-rows)
- Keyboard navigation
- [Fully editable grid](http://adazzle.github.io/react-data-grid/#/examples/editable)
- [Rich cell editors like checkbox and dropdown editors, complete with keyboard navigation](http://adazzle.github.io/react-data-grid/#/examples/built-in-editors)
- Custom cell Editors - Easily create your own
- [Custom cell Formatters](http://adazzle.github.io/react-data-grid/#/examples/custom-formatters)
- [Frozen columns](http://adazzle.github.io/react-data-grid/#/examples/frozen-cols)
- [Resizable columns](http://adazzle.github.io/react-data-grid/#/examples/resizable-cols)
- [Sorting](http://adazzle.github.io/react-data-grid/#/examples/sortable-cols)
- [Filtering](http://adazzle.github.io/react-data-grid/#/examples/filterable-sortable-grid)
- [Context Menu](http://adazzle.github.io/react-data-grid/#/examples/context-menu)
- Copy and Paste values into other cells
- [Multiple cell updates using cell dragdown](http://adazzle.github.io/react-data-grid/#/examples/cell-drag-down)
- [Association of events of individual columns](http://adazzle.github.io/react-data-grid/#/examples/column-events)


Contributing
------------

Please see [CONTRIBUTING](CONTRIBUTING.md)

Credits
------------
This project has been built upon the great work done by [Prometheus Research](https://github.com/prometheusresearch). For the original project, please click [here]( https://github.com/prometheusresearch/react-grid). It is released under [MIT](https://github.com/adazzle/react-data-grid/blob/master/LICENSE)

Dev server, publishing
-----------

Publish:
```
# build both version
npm run build
npm run build-commonjs

# publishing directly
cd packages/react-data-grid
npm publish
```

Running
```
# build first
npm run build
# run dev server
npm run start

# when source has changed, build again and start
```
