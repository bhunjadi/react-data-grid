import React from 'react';
import ReactDataGrid, {ReactDataGridProps} from '../ReactDataGrid';
import { shallow } from 'enzyme';
import helpers, { Row } from '../helpers/test/GridPropHelpers';
import {DEFINE_SORT} from '../../lib/common/enums';

describe('ReactDataGrid', () => {

  describe('When multipleColumnsSort is enabled', () => {
    const testProps: ReactDataGridProps<Row> = {
      columns: helpers.columns,
      rowsCount: 0,
      minHeight: 300,
      rowHeight: 40,
      rowGetter(idx: number) {
        return {};
      },
      multipleColumnsSort: true,
      onGridMultipleColumnsSort: jest.fn(),
      sort: [{column: 'title', direction: DEFINE_SORT.ASC}]
    };

    const event = {

    } as React.KeyboardEvent;

    function wrap(props: object = {}) {
      return shallow<ReactDataGrid<Row>>(<ReactDataGrid<Row> {...testProps} {...props} />);
    }

    it('initializes sort upon construction', () => {
      const wrapper = wrap();
      expect(wrapper.state().sort).toEqual(testProps.sort);
    });

    it('calls onGridMultipleColumnsSort when sorting', () => {
      const wrapper = wrap();
      wrapper.instance().handleSort('title', DEFINE_SORT.DESC, event);
      const expectedSort = [{column: 'title', direction: DEFINE_SORT.DESC}];
      expect(wrapper.state().sort).toEqual(expectedSort);
      expect(testProps.onGridMultipleColumnsSort).toHaveBeenCalledWith(expectedSort, 'title', DEFINE_SORT.DESC);
    });

    it('adds a new sort column', () => {
      const wrapper = wrap();
      wrapper.instance().handleSort('count', DEFINE_SORT.ASC, event);
      const expectedSort = [{column: 'title', direction: DEFINE_SORT.ASC}, {column: 'count', direction: DEFINE_SORT.ASC}];
      expect(wrapper.state().sort).toEqual(expectedSort);
    });

    it('removes a sort column', () => {
      const wrapper = wrap();
      wrapper.instance().handleSort('title', DEFINE_SORT.NONE, event);
      expect(wrapper.state().sort).toEqual([]);
    });

    it('adds first sort column correctly', () => {
      const wrapper = wrap({sort: undefined});
      wrapper.instance().handleSort('count', DEFINE_SORT.DESC, event);
      expect(wrapper.state().sort).toEqual([{column: 'count', direction: DEFINE_SORT.DESC}]);
    });

    describe('and requireCtrlForMultipleColumnsSort is enabled', () => {
      it('overwrites sort - without ctrl', () => {
        const sort = [{column: 'title', direction: DEFINE_SORT.ASC}, {column: 'count', direction: DEFINE_SORT.ASC}];
        const wrapper = wrap({sort, requireCtrlForMultipleColumnsSort: true});
        wrapper.instance().handleSort('id', DEFINE_SORT.ASC, {ctrlKey: false, metaKey: false} as React.KeyboardEvent);
        expect(wrapper.state().sort).toEqual([{column: 'id', direction: DEFINE_SORT.ASC}]);
      });

      ['ctrl', 'cmd'].forEach(type => {
        it(`adds sort item with ${type} pressed`, () => {
          const sort = [{column: 'title', direction: DEFINE_SORT.ASC}, {column: 'count', direction: DEFINE_SORT.ASC}];
          const wrapper = wrap({sort, requireCtrlForMultipleColumnsSort: true});
          const event = type === 'ctrl' ? {ctrlKey: true} as React.KeyboardEvent : {metaKey: true} as React.KeyboardEvent;
          wrapper.instance().handleSort('id', DEFINE_SORT.ASC, event);
          expect(wrapper.state().sort).toEqual([...sort, {column: 'id', direction: DEFINE_SORT.ASC}]);
        });
      });
    });
  });
});
