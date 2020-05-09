import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { chosenTextFieldDisplayAttributes } from 'q3-ui-forms/lib/fields/TextBase/TextBase';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useValue } from 'useful-state';
import { useFilters } from 'q3-ui-rest';
import { Definitions } from '../state';

const FiltersForm = ({
  children,
  name,
  query,
  handleSave,
  search,
  lookup,
}) => {
  const { collectionName, location } = React.useContext(
    Definitions,
  );

  const { t } = useTranslation();
  const { value, onChange } = useValue(name);
  const runSave = (res) => handleSave(value, res);

  const { fields = {}, loading } = useFilters({
    query: search,
    fields: lookup,
    coll: collectionName,
    location,
  });

  return loading ? (
    <CircularProgress />
  ) : (
    <EncodedUrl
      query={query}
      onSave={value ? runSave : null}
    >
      <Grid item xs={12}>
        <TextField
          name="Filter name"
          label={t('labels:filterName')}
          value={value}
          helperText={t('helpers:filterName')}
          onChange={onChange}
          {...chosenTextFieldDisplayAttributes}
        />
        <Box py={1}>
          <Divider />
        </Box>
      </Grid>
      {children(fields)}
    </EncodedUrl>
  );
};

FiltersForm.propTypes = {
  children: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  name: PropTypes.string,
  query: PropTypes.string,
  search: PropTypes.string.isRequired,
  lookup: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FiltersForm.defaultProps = {
  query: '',
  name: '',
};

export default FiltersForm;
