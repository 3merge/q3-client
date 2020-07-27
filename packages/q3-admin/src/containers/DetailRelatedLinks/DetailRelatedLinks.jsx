import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { object } from 'q3-ui-helpers';
import { Link } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Store } from '../state';
import useStyle from './useStyle';

const RelatedLinks = ({ children, links }) => {
  const { data } = React.useContext(Store);
  const cls = useStyle();

  return (
    <Box className={cls.wrapper}>
      <Container maxWidth="xl" disableGutters>
        <Grid container>
          <Grid item className={cls.fill}>
            <Box pb={4}>
              <Container disableGutters maxWidth="xl">
                {children}
              </Container>
            </Box>
          </Grid>
          {object.isFn(links) ? (
            <Grid
              id="q3-related-links"
              item
              className={cls.column}
            >
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
                {links(data).map((link) => (
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
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
};

RelatedLinks.propTypes = {
  children: PropTypes.node.isRequired,
  links: PropTypes.func,
};

RelatedLinks.defaultProps = {
  links: null,
};

export default RelatedLinks;
