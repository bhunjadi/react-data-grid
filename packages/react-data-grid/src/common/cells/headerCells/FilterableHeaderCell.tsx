import React, { useState } from 'react';
import { FilterRendererProps, CalculatedColumn, GridFilters } from '../../types';

function getInputValue<R>(column: CalculatedColumn<R>, filters?: GridFilters<R>) {
  if (!filters) {
    return;
  }

  return filters[column.key as string] || '';
}

export default function FilterableHeaderCell<R>({ column, filters, onChange }: FilterRendererProps<R>) {
  const [filterTerm, setFilterTerm] = useState(() => getInputValue(column, filters));

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setFilterTerm(value);
    if (onChange) {
      onChange({ filterTerm: value, column });
    }
  }

  if (column.filterable === false) {
    return <div />;
  }

  return (
    <div className="form-group">
      <input
        key={`header-filter-${column.key as keyof R}`}
        className="form-control input-sm"
        placeholder="Search"
        value={filterTerm}
        onChange={handleChange}
      />
    </div>
  );
}
