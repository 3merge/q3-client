import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { withLocation } from 'with-location';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { props } from 'q3-ui-helpers';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import { useToggle } from 'useful-state';
import { makeStyles } from '@material-ui/core/styles';

const { mapBy } = props;

export const FilterGroup = ({
  title,
  children,
  count,
  params,
}) => {
  const { toggle, state } = useToggle();
  const { t } = useTranslation();

  const a = mapBy(children, 'name')
    .filter(Boolean)
    .map((v) => {
      try {
        return encodeURIComponent(v).replace(/~/g, '.');
      } catch (e) {
        return v;
      }
    });

  const values = [...a, ...count]
    .flatMap((c) => {
      const v = params.get(c);
      return v && v.includes(',') ? v.split(',') : v;
    })
    .filter(Boolean).length;

  return (
    <Box width="100%" maxWidth="100%" px={0.5}>
      <ListItem
        button
        ContainerComponent="div"
        onClick={toggle}
        selected={state}
      >
        <ListItemText primary={t(`titles:${title}`)} />
        <Box mr={0.75}>
          <Badge
            badgeContent={values}
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {state ? <ExpandLess /> : <ExpandMore />}
          </Badge>
        </Box>
      </ListItem>
      <Collapse in={state}>
        <Box my={1}>
          <Grid container>{children}</Grid>
        </Box>
      </Collapse>
    </Box>
  );
};

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  count: PropTypes.arrayOf(PropTypes.string),
};

FilterGroup.defaultProps = {
  count: [],
};

export default withLocation(FilterGroup);
