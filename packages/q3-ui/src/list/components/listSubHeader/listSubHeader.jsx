import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

const ListSubHeader = ({ title, children }) => {
  const { t } = useTranslation('titles');

  return (
    <ListSubheader
      id={title}
      component="li"
      style={{ padding: 0 }}
    >
      {title && (
        <Typography variant="overline" component="h3">
          {t(title)}
        </Typography>
      )}
      {children}
    </ListSubheader>
  );
};

ListSubHeader.propTypes = {
  /**
   * A semantic title for the list
   */
  title: PropTypes.string,

  /**
   * Global list element.
   */
  children: PropTypes.node,
};

ListSubHeader.defaultProps = {
  title: null,
  children: null,
};

export default ListSubHeader;
