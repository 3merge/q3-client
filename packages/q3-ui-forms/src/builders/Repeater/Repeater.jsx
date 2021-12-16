import React from 'react';
import PropTypes from 'prop-types';
import flat from 'flat';
import { useTranslation } from 'q3-ui-locale';
import { Box, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from 'q3-ui/lib/iconButton';
import { object } from 'q3-ui-helpers';
import { makeStyles } from '@material-ui/core/styles';
import {
  BuilderState,
  DispatcherState,
} from '../../FormsContext';
import {
  getEmptyEntry,
  checkValueIfWithinMinimumThreshold,
  assignNameToFields,
  makeStateProxy,
} from './utils';

const useStyle = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.background.muted}`,
    paddingRight: '1.5rem',
    marginRight: '.5rem',

    '& .q3-forms-repeater-remove': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

const Repeater = ({
  group,
  required,
  children,
  min,
  max,
}) => {
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const { setFieldValue, setValues, setErrors } =
    React.useContext(DispatcherState);

  const proxy = makeStateProxy(
    React.useContext(BuilderState),
    group,
  );

  const items = proxy.getAll();
  const canAddRows = items.length < max;
  const canRemoveRows = items.length > min;
  const length = Math.max(items.length, min);
  const cls = useStyle();

  const unsetGroupFieldsFromState = (index, stateHandler) =>
    stateHandler((prev) => {
      const current = flat.unflatten(object.is(prev));
      current[group] = proxy.filterByIndex(current, index);

      // remove empty references
      if (current[group].length === 0)
        delete current[group];

      // preserves nested values in Autcomplete, Chips, etc.
      return flat(current, {
        maxDepth: 3,
      });
    });

  const deconstructEntriesIntoFieldState = (obj = {}) =>
    Object.entries(obj).forEach(([key, init]) =>
      setFieldValue(key, init, {
        flat: true,
      }),
    );

  const addToSet = () => {
    const newState = flat(
      getEmptyEntry(group, items.length, children),
    );

    deconstructEntriesIntoFieldState(newState);
    ref.current = newState;
  };

  const removeFromSet = (index) => () => {
    unsetGroupFieldsFromState(index, setErrors);
    unsetGroupFieldsFromState(index, setValues);
  };

  return (
    <Grid item xs={12}>
      <Box mb={0.5}>
        <Typography variant="overline" component="span">
          {t(group)} (Min: {min}, Max: {max})
        </Typography>
      </Box>
      {Array.from({ length }).map((_, i) => (
        <Box
          py={1}
          mb={0.25}
          bgcolor="inherit"
          position="relative"
          key={`${group}-${i}`}
          className={cls.root}
        >
          <Grid container spacing={1}>
            {assignNameToFields(
              {
                newState: ref.current,
                validate: required
                  ? checkValueIfWithinMinimumThreshold(min)
                  : undefined,
                prefix: group,
                index: i,
              },
              children,
              t,
            )}
          </Grid>
          <Box
            position="absolute"
            top="1.25rem"
            right="-1rem"
          >
            <IconButton
              label="remove"
              icon={DeleteIcon}
              buttonProps={{
                onClick: removeFromSet(i),
                // See note above for the *-add class.
                // Same applies here.
                className: 'q3-forms-repeater-remove',
                disabled: !canRemoveRows,
              }}
            />
          </Box>
        </Box>
      ))}
      <Box bgcolor="inherit" my={0.5}>
        <Button
          label="add"
          startIcon={<AddIcon />}
          onClick={addToSet}
          className="q3-forms-repeater-add"
          disabled={!canAddRows}
        >
          {t('addRow')}
        </Button>
      </Box>
    </Grid>
  );
};

Repeater.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  group: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  required: PropTypes.bool,
};

Repeater.defaultProps = {
  required: false,
  max: Infinity,
  min: 1,
};

export default Repeater;
