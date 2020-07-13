import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Store } from '../state';
import useStyle from './useStyle';

const RelatedLinksResolver = ({ fn }) => {
  const cls = useStyle();
  const { data } = React.useContext(Store);

  return (
    <List
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        >
          Related links
        </ListSubheader>
      }
    >
      {fn(data).map((link) => (
        <ListItem
          button
          dense
          key={link.to}
          to={link.to}
          component={Link}
        >
          <ListItemText
            primary={link.label}
            primaryTypographyProps={{
              className: cls.root,
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

RelatedLinksResolver.propTypes = {
  fn: PropTypes.func.isRequired,
};

export default RelatedLinksResolver;
