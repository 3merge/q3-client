import React from 'react';
import PropTypes from 'prop-types';
import flat from 'flat';
import { useTranslation } from 'react-i18next';
import { get, last, first } from 'lodash';
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

const autofocusNewField = (key) =>
  setTimeout(() => {
    try {
      document.getElementById(key).focus();
    } catch (e) {
      // null
    }
  });

const Repeater = ({ group, children, min, max }) => {
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

  const deconstructEntriesIntoFieldState = (obj = {}) =>
    Object.entries(obj).forEach(([key, init]) => {
      setFieldValue(key, init, {
        flat: true,
      });
    });

  const addToSet = () => {
    const newState = flat(
      getEmptyEntry(group, items.length, children),
    );

    deconstructEntriesIntoFieldState(newState);
    autofocusNewField(last(Object.keys(newState)));
  };

  const removeFromSet = (index) => () => {
    unsetGroupFieldsFromState(index, setErrors);
    unsetGroupFieldsFromState(index, setValues);
  };

  const init = () => {
    const empty = Array.from({
      length: min,
    }).reduce((acc, _, index) => {
      if (index < items.length) return acc;

      return Object.assign(
        acc,
        getEmptyEntry(
          group,
          items.length + index,
          children,
        ),
      );
    }, {});

    deconstructEntriesIntoFieldState(empty);
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Grid item xs={12}>
      <Typography variant="overline" component="span">
        {t(group)} (Min: {min}, Max: {max})
      </Typography>

      {items.map((item, i) => (
        <Grid container key={`${group}-${i}`} spacing={1}>
          <Grid item style={{ flex: 1 }}>
            <Grid container spacing={1}>
              {assignNameToFields(
                {
                  validate(val) {
                    try {
                      const num = first(
                        // eslint-disable-next-line
                        last(this.path.split('[')).split(
                          ']',
                        ),
                      );

                      return Number(num) < min
                        ? Boolean(val)
                        : true;
                    } catch (e) {
                      return true;
                    }
                  },
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
};

Repeater.defaultProps = {
  max: Infinity,
  min: 1,
};

export default Repeater;
