import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ListMui from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../searchBar';
import Empty from '../empty';

const List = ({ title, enableSearch, children }) => {
  const { t } = useTranslation('titles');

  const hasChildren =
    (children && !Array.isArray(children)) ||
    (Array.isArray(children) && children.length);

  return (
    <SearchBar>
      {(renderer) => (
        <ListMui
          subheader={
            <ListSubheader
              component="li"
              style={{ padding: 0 }}
              id={title}
            >
              {title && (
                <Typography
                  variant="overline"
                  component="h3"
                >
                  {t(title)}
                </Typography>
              )}
              {enableSearch && hasChildren
                ? renderer()
                : null}
            </ListSubheader>
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
    PropTypes.node,
    PropTypes.arrayOf([PropTypes.node]),
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
