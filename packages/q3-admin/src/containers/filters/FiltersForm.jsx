import React from 'react';
import PropTypes from 'prop-types';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FiltersStore } from '../state';

const FiltersForm = ({ children, search, ...etc }) => {
  const filters = React.useContext(FiltersStore);

  return filters.fetching ? (
    <CircularProgress />
  ) : (
    <EncodedUrl query={search} {...etc}>
      {children(filters.fields, filters.getOptions)}
    </EncodedUrl>
  );
};

FiltersForm.propTypes = {
  children: PropTypes.func.isRequired,
  search: PropTypes.string,
};

FiltersForm.defaultProps = {
  search: '',
};

export default FiltersForm;
