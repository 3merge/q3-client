import React from 'react';
import PropTypes from 'prop-types';
import Asset from 'q3-ui-assets';
import { Box } from '@material-ui/core';
import { compose } from 'lodash/fp';
import { isFunction, size } from 'lodash';
import ActionBar from '../ActionBar';
import AddItem from '../AddItem';
import RepeaterTable from '../RepeaterTable';
import RepeaterOptions from '../RepeaterOptions';
import {
  filter,
  sort,
  search,
  group,
  reducer,
} from '../../helpers';
import useStyle from './styles';

const optionType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    fn: PropTypes.func,
  }),
);

const init = {
  sortBy: 0,
  filterBy: 0,
  input: '',
};

const Repeater = ({
  addComponent,
  bulkEditorComponent,
  emptyComponent,
  children,
  data,
  disableSearch,
  filterOptions,
  groupBy,
  initialValues,
  sortOptions,
  renderOther,
  ...rest
}) => {
  const [state, dispatch] = React.useReducer(reducer, init);
  const cls = useStyle();

  const run = compose(
    group(groupBy),
    sort(sortOptions[state.sortBy]),
    filter(filterOptions[state.filterBy]),
    search(state.input),
  );

  const len = size(data);
  const newData = run(data);
  const showSearch = !disableSearch && len;

  const Add = React.useMemo(
    () => (
      <AddItem
        addComponent={addComponent}
        initialValues={initialValues}
      >
        {children}
      </AddItem>
    ),
    [initialValues],
  );

  const CustomElements = React.useMemo(
    () =>
      isFunction(renderOther) ? renderOther(newData) : null,
    [newData],
  );

  const Empty = React.useMemo(
    () =>
      emptyComponent || (
        <Box>
          <Asset icon="Empty" title="empty" />
        </Box>
      ),
    [],
  );

  const Tools = React.useMemo(
    () => (
      <>
        {addComponent && Add}
        <RepeaterOptions
          state={state}
          dispatch={dispatch}
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          disableSearch={!showSearch}
        >
          <ActionBar
            renderSelected={bulkEditorComponent}
            length={len}
          />
          {CustomElements}
          {!addComponent && Add}
        </RepeaterOptions>
      </>
    ),
    [
      Add,
      CustomElements,
      state,
      filterOptions,
      sortOptions,
      showSearch,
    ],
  );

  return (
    <Box className={cls.root}>
      {Tools}
      <Box my={1} className="q3-repeater-tables">
        <RepeaterTable
          data={newData}
          initialValues={initialValues}
          {...rest}
        >
          {children}
        </RepeaterTable>
      </Box>
      <Box className="q3-repeater-empty-graphic">
        {Empty}
      </Box>
    </Box>
  );
};

Repeater.defaultProps = {
  addComponent: null,
  bulkEditorComponent: null,
  data: [],
  disableSearch: false,
  groupBy: null,
  sortOptions: [],
  filterOptions: [],
  emptyComponent: null,
  renderOther: null,
};

Repeater.propTypes = {
  addComponent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  bulkEditorComponent: PropTypes.node,
  emptyComponent: PropTypes.node,
  initialValues: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  disableSearch: PropTypes.bool,
  children: PropTypes.node.isRequired,
  sortOptions: optionType,
  filterOptions: optionType,
  groupBy: optionType,
  renderOther: PropTypes.func,
};

export default Repeater;
