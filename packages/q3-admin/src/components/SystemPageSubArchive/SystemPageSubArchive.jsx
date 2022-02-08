import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import { Link } from '@reach/router';
import { isFunction, map, size } from 'lodash';
import { Container } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const SystemPageSubArchive = ({
  items,
  photo,
  title,
  subtitle,
}) => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm">
      <Box component="header" textAlign="center" mb={2}>
        <Box display="inline-block" width={180}>
          {photo}
        </Box>
        <Typography variant="h6" component="h1">
          {title}
        </Typography>
        <Typography>{subtitle}</Typography>
      </Box>
      <List component="section">
        {map(items, ({ onClick, text, to = '/' }, idx) => {
          const Text = (
            <>
              <ListItemText
                primary={t(`titles:${text}`)}
                secondary={t(`descriptions:${text}`)}
              />
              <ListItemSecondaryAction>
                <ArrowForwardIosIcon />
              </ListItemSecondaryAction>
            </>
          );

          return (
            <React.Fragment key={text}>
              {isFunction(onClick) ? (
                <ListItem button onClick={onClick}>
                  {Text}
                </ListItem>
              ) : (
                <ListItem button component={Link} to={to}>
                  {Text}
                </ListItem>
              )}
              {idx !== size(items) - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
};

SystemPageSubArchive.defaultProps = {
  items: [],
  photo: null,
};

SystemPageSubArchive.propTypes = {
  items: PropTypes.arrayOf([
    PropTypes.shape({
      onClick: PropTypes.func,
      text: PropTypes.string,
      to: PropTypes.string,
    }),
  ]),
  photo: PropTypes.element,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SystemPageSubArchive;
