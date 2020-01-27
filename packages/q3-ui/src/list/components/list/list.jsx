import React from 'react';
import PropTypes from 'prop-types';
import ListMui from '@material-ui/core/List';
import SearchBar from '../searchBar';
import ListSubHeader from '../listSubHeader';
import Empty from '../empty';
import { hasLength } from '../../utils';

const List = ({ title, enableSearch, children }) => {
  const hasChildren =
    (children && !Array.isArray(children)) ||
    hasLength(children);

  return (
    <SearchBar>
      {(renderer) => (
        <ListMui
          aria-labelledby={title}
          subheader={
            <ListSubHeader title={title}>
              {enableSearch && hasChildren
                ? renderer()
                : null}
            </ListSubHeader>
          }
        >
          {hasChildren ? children : <Empty />}
        </ListMui>
      )}
    </SearchBar>
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
  ]).isRequired,

  /**
   * A semantic title for the list
   */
  title: PropTypes.string,

  /**
   * Enable result text filtering.
   */
  enableSearch: PropTypes.bool,
};

List.defaultProps = {
  title: null,
  enableSearch: true,
};

export default List;
