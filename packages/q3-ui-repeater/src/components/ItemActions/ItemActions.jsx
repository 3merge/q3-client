import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import Down from '@material-ui/icons/KeyboardArrowDown';
import Up from '@material-ui/icons/KeyboardArrowUp';
import TableCell from '@material-ui/core/TableCell';
import classnames from 'classnames';
import ItemActionsWrapper from '../ItemActionsWrapper';
import DeleteModal from '../DeleteModal';
import useStyle from '../useStyle';

const ItemActions = ({
  actions,
  children,
  showEditor,
  showRemove,
  toggleNested,
  nestedIsVisible,
  renderNestedTableRow,
  id,
}) => {
  const { tableCell, tableActions } = useStyle();

  return (
    <TableCell
      className={classnames(tableCell, tableActions)}
    >
      {renderNestedTableRow && (
        <IconButton
          aria-label="toggle-info"
          onClick={toggleNested}
        >
          {nestedIsVisible ? <Up /> : <Down />}
        </IconButton>
      )}
      {showEditor && (
        <ItemActionsWrapper id={id}>
          {children}
        </ItemActionsWrapper>
      )}
      {map(
        actions,
        ({ component: Component, icon, label }) => (
          <ItemActionsWrapper
            id={id}
            key={label}
            label={label}
            icon={icon}
          >
            <Component />
          </ItemActionsWrapper>
        ),
      )}
      {showRemove && <DeleteModal id={id} />}
    </TableCell>
  );
};

ItemActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
      ]),
      component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
      ]),
    }),
  ),
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  children: PropTypes.node.isRequired,
  toggleNested: PropTypes.func.isRequired,
  showEditor: PropTypes.bool,
  showRemove: PropTypes.bool,
  nestedIsVisible: PropTypes.bool,
  renderNestedTableRow: PropTypes.func,
};

ItemActions.defaultProps = {
  actions: [],
  showRemove: true,
  showEditor: true,
  nestedIsVisible: false,
  renderNestedTableRow: null,
};

export default ItemActions;
