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
import {
  BuilderState,
  DispatcherState,
} from '../../FormsContext';
import { getEmptyEntry, assignNameToFields } from './utils';

const Repeater = ({ group, children }) => {
  const { t } = useTranslation('labels');
  const { values } = React.useContext(BuilderState);
  const { setValues, setErrors } = React.useContext(
    DispatcherState,
  );

  const items = get(flat.unflatten(values), group, []);

  const unsetGroupFieldsFromState = (index, stateHandler) =>
    stateHandler((prev) =>
      Object.keys(
        getEmptyEntry(group, index, children),
      ).reduce(
        (acc, key) => {
          unset(acc, key);
          return acc;
        },
        { ...prev },
      ),
    );

  const addToSet = () =>
    setValues((prev) => ({
      ...prev,
      ...flat(getEmptyEntry(group, items.length, children)),
    }));

  const removeFromSet = (index) => () => {
    unsetGroupFieldsFromState(index, setErrors);
    unsetGroupFieldsFromState(index, setValues);
  };

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
  group: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default Repeater;
