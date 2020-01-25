import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ListMui from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Empty from '../empty';

const List = ({ title, children }) => {
  const { t } = useTranslation('titles');

  return (
    <ListMui
      subheader={
        title && (
          <ListSubheader
            component="li"
            style={{ padding: 0 }}
            id={title}
          >
            <Typography variant="overline" component="h3">
              {t(title)}
            </Typography>
          </ListSubheader>
        )
      }
    >
      {children || <Empty />}
    </ListMui>
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
};

List.defaultProps = {
  title: null,
};

export default List;
