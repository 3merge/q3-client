import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import CloseIcon from '@material-ui/icons/Close';
import {
  Box,
  IconButton,
  Popover,
} from '@material-ui/core';
import { browser } from 'q3-ui-helpers';
import ColumnConfiguration from '../ColumnConfiguration';
import ReactConfigurationContext from '../ColumnConfigurationContext';
import ColumnReorder from '../ColumnReorder';
import { REORDER_COLUMN, makeColumnId } from '../constants';

const withColumnConfigurationProvider = (Component) => {
  const DecoratedDataTable = (props) => {
    const [field, setField] = React.useState(null);
    const { columns, onColumnChange } = props;
    const isOpen = Boolean(field);

    const changeField = (xs) => setField(xs);
    const changeFieldData = (args) =>
      onColumnChange(field, args);

    const handleClose = () => setField(null);

    const getAnchorEl = () =>
      browser.isBrowserReady() && field
        ? document.getElementById(makeColumnId(field))
        : null;

    const providerValue = React.useMemo(
      () => ({
        changeField,
        changeFieldData,
        field,
        fieldData: find(
          columns,
          (column) => column.field === field,
        ),
      }),
      [columns, field],
    );

    const renderedComponent = React.useMemo(
      () => <Component {...props} />,
      [columns],
    );

    return (
      <ReactConfigurationContext.Provider
        value={providerValue}
      >
        {renderedComponent}
        <Popover
          anchorEl={getAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          id="column-config"
          open={isOpen}
          onClose={handleClose}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box maxHeight={250} width={270}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            {isOpen ? (
              <>
                {field === REORDER_COLUMN ? (
                  <ColumnReorder {...props} />
                ) : (
                  <ColumnConfiguration />
                )}
              </>
            ) : null}{' '}
          </Box>
        </Popover>
      </ReactConfigurationContext.Provider>
    );
  };

  DecoratedDataTable.defaultProps = {
    columns: [],
  };

  DecoratedDataTable.propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string,
      }),
    ),
    onColumnChange: PropTypes.func.isRequired,
  };

  return DecoratedDataTable;
};

export default withColumnConfigurationProvider;
