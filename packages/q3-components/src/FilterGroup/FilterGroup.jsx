import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { withLocation } from 'with-location';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { props } from 'q3-ui-helpers';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import { useToggle } from 'useful-state';

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
    <Box width="100%" my={1} px={2}>
      <Grid
        container
        justify="space-between"
        role="button"
        onClick={toggle}
        style={{ cursor: 'pointer' }}
        tabIndex={0}
      >
        <Grid item>
          <Typography>{t(`titles:${title}`)}</Typography>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
      <Collapse in={state}>
        <Box my={1}>{children}</Box>
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
