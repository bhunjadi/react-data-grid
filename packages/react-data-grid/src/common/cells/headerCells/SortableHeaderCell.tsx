import React, { useCallback } from 'react';
import { isElement } from 'react-is';
import { HeaderRowType, DEFINE_SORT } from '../../enums';
import { CalculatedColumn, SortableCellRendererProps, SortableCellContentRenderer } from '../../types';

const SORT_TEXT = {
  [DEFINE_SORT.ASC]: '\u25B2',
  [DEFINE_SORT.DESC]: '\u25BC',
  [DEFINE_SORT.NONE]: ''
} as const;

const SORT_CLASS_NAME = {
  [DEFINE_SORT.ASC]: 'asc',
  [DEFINE_SORT.DESC]: 'desc',
  [DEFINE_SORT.NONE]: 'none'
};

export interface Props<R> {
  column: CalculatedColumn<R>;
  rowType: HeaderRowType;
  onSort(columnKey: keyof R, direction: DEFINE_SORT, event: React.SyntheticEvent): void;
  sortDirection: DEFINE_SORT;
  sortDescendingFirst: boolean;
  renderSortableCellContent?: SortableCellContentRenderer<R>;
}

function DefaultCellRenderer<R>(props: SortableCellRendererProps<R>) {
  const { column, rowType, sortDirection, onClick } = props;
  const { headerRenderer } = column;
  const content = !headerRenderer
    ? column.name
    : isElement(headerRenderer)
      ? React.cloneElement(headerRenderer, { column })
      : React.createElement(headerRenderer, { column, rowType });

  const className = `rdg-sortable-header-cell rdg-sort-${SORT_CLASS_NAME[sortDirection]}`;
  return (
    <div className={className} onClick={onClick}>
      <span className="pull-right rdg-sort-arrow">{SORT_TEXT[sortDirection]}</span>
      {content}
    </div>
  );
}

export default function SortableHeaderCell<R>(props: Props<R>) {
  const { column, rowType, onSort, sortDirection, sortDescendingFirst, renderSortableCellContent } = props;

  const handleClick = useCallback((event: React.SyntheticEvent) => {
    let direction;
    switch (sortDirection) {
      case DEFINE_SORT.ASC:
        direction = sortDescendingFirst ? DEFINE_SORT.NONE : DEFINE_SORT.DESC;
        break;
      case DEFINE_SORT.DESC:
        direction = sortDescendingFirst ? DEFINE_SORT.ASC : DEFINE_SORT.NONE;
        break;
      default:
        direction = sortDescendingFirst ? DEFINE_SORT.DESC : DEFINE_SORT.ASC;
        break;
    }
    onSort(column.key, direction, event);
  }, [sortDirection, onSort, column, sortDescendingFirst]);

  const rendererProps = {
    column,
    rowType,
    sortDirection,
    onClick: handleClick
  };

  const Cell = renderSortableCellContent || DefaultCellRenderer;

  return <Cell {...rendererProps} />;
}
