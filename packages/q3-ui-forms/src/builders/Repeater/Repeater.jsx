import React from 'react';
import PropTypes from 'prop-types';
import flat from 'flat';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from 'q3-ui/lib/iconButton';
import { object } from 'q3-ui-helpers';
import {
  BuilderState,
  DispatcherState,
} from '../../FormsContext';
import {
  autofocusNewField,
  getEmptyEntry,
  checkValueIfWithinMinimumThreshold,
  assignNameToFields,
  makeStateProxy,
} from './utils';

const Repeater = ({
  group,
  required,
  children,
  min,
  max,
}) => {
  const { t } = useTranslation('labels');

  const {
    setFieldValue,
    setValues,
    setErrors,
  } = React.useContext(DispatcherState);

  const proxy = makeStateProxy(
    React.useContext(BuilderState),
    group,
  );

  const items = proxy.getAll();
  const canAddRows = items.length < max;
  const canRemoveRows = items.length > min;

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
    autofocusNewField(object.getTopKey(newState));
  };

  const removeFromSet = (index) => () => {
    unsetGroupFieldsFromState(index, setErrors);
    unsetGroupFieldsFromState(index, setValues);
  };

  return (
    <Grid item xs={12}>
      <Typography variant="overline" component="span">
        {t(group)} (Min: {min}, Max: {max})
      </Typography>

      {Array.from({
        length: Math.max(items.length, min),
      }).map((_, i) => (
        <Grid container key={`${group}-${i}`} spacing={1}>
          <Grid item style={{ flex: 1 }}>
            <Grid container spacing={1}>
              {assignNameToFields(
                {
                  validate: required
                    ? checkValueIfWithinMinimumThreshold(
                        min,
                      )
                    : undefined,
                  prefix: group,
                  index: i,
                },
                children,
                t,
              )}
            </Grid>
          </Grid>
          <Grid item style={{ width: 'auto' }}>
            <Box p={0.5}>
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
              {items.length - 1 === i && (
                <IconButton
                  label="add"
                  icon={AddIcon}
                  buttonProps={{
                    onClick: addToSet,
                    // Referenced in this integration test suite.
                    // There are no styles associated withit.
                    className: 'q3-forms-repeater-add',
                    disabled: !canAddRows,
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      ))}
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
