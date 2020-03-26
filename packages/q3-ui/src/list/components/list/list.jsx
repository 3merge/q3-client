import React from 'react';
import PropTypes from 'prop-types';
import ListMui from '@material-ui/core/List';
import ListSubHeader from '../listSubHeader';
import Empty from '../empty';
import { hasLength } from '../../utils';

const List = ({ title, children, onCreate }) => {
  const hasChildren =
    (children && !Array.isArray(children)) ||
    hasLength(children);

  return (
    <ListMui
      aria-labelledby={title}
      subheader={<ListSubHeader title={title} />}
    >
      {hasChildren ? (
        children
      ) : (
        <Empty onClick={onCreate} />
      )}
    </ListMui>
  );
};

List.propTypes = {
  /*
   * An array of ListItem components
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.node, PropTypes.object]),
    PropTypes.node,
    PropTypes.object,
  ]),

  /**
   * A semantic title for the list
   */
  title: PropTypes.string,

  /**
   * Will populate the empty view with button.
   */
  onCreate: PropTypes.func,
};

List.defaultProps = {
  title: null,
  children: null,
  onCreate: null,
};

export default List;
