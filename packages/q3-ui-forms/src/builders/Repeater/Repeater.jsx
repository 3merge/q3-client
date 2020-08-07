import React from 'react';
import PropTypes from 'prop-types';
import flat from 'flat';
import { useTranslation } from 'react-i18next';
import { get, unset } from 'lodash';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from 'q3-ui/lib/iconButton';
import { array, object } from 'q3-ui-helpers';
import {
  BuilderState,
  DispatcherState,
} from '../../FormsContext';
import { getEmptyEntry, assignNameToFields } from './utils';

const Repeater = ({
  group,
  children,
  required,
  min,
  max,
}) => {
  // eslint-disable-next-line
  if (required && min < 1) min = 1;

  const { t } = useTranslation('labels');
  const { values } = React.useContext(BuilderState);
  const {
    setFieldValue,
    setValues,
    setErrors,
  } = React.useContext(DispatcherState);

  const items = array
    .is(get(flat.unflatten(object.is(values)), group, []))
    .filter(object.hasKeys);

  const canRemoveRows = items.length > min;
  const canAddRows = items.length < max;

  const unsetGroupFieldsFromState = (index, stateHandler) =>
    stateHandler((prev) => {
      const current = flat.unflatten(object.is(prev));

      current[group] = Array.isArray(current[group])
        ? current[group].filter((item, i) => i !== index)
        : [];

      // remove empty references
      if (current[group].length === 0)
        delete current[group];

      // preserves nested values in Autcomplete, Chips, etc.
      return flat(current, { maxDepth: 3 });
    });

  const addToSet = () =>
    Object.entries(
      flat(getEmptyEntry(group, items.length, children)),
    ).forEach(([key, init]) => {
      setFieldValue(key, init, {
        flat: true,
      });
    });

  const removeFromSet = (index) => () => {
    unsetGroupFieldsFromState(index, setErrors);
    unsetGroupFieldsFromState(index, setValues);
  };

  React.useEffect(() => {
    if (!canRemoveRows && canAddRows) addToSet();
  }, []);

  return (
    <Grid item xs={12}>
      <Typography variant="overline" component="span">
        {t(group)}
      </Typography>

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

      {items.map((item, i) => (
        <Grid container key={`${group}-${i}`} spacing={1}>
          <Grid item style={{ flex: 1 }}>
            <Grid container spacing={1}>
              {assignNameToFields(group, i, children, t)}
            </Grid>
          </Grid>
          <Grid item style={{ width: 'auto' }}>
            <Box p={0.5}>
              <IconButton
                label="add"
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
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

Repeater.propTypes = {
  required: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  group: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

Repeater.defaultProps = {
  required: false,
  max: Infinity,
  min: 0,
};

export default Repeater;
