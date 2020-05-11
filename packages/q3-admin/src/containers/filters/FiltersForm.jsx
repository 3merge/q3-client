import React from 'react';
import PropTypes from 'prop-types';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFilters } from 'q3-ui-rest';
import { Definitions } from '../state';

const FiltersForm = ({
  children,
  search,
  lookup,
  handleSave,
  renderBottom,
}) => {
  const { collectionName, location } = React.useContext(
    Definitions,
  );

  const { fields = {}, fetching, getOptions } = useFilters({
    fields: lookup,
    coll: collectionName,
    location,
  });
  return fetching ? (
    <CircularProgress />
  ) : (
    <EncodedUrl
      query={search}
      onSave={handleSave}
      renderBottom={renderBottom}
    >
      {children(fields, getOptions)}
    </EncodedUrl>
  );
};

FiltersForm.propTypes = {
  children: PropTypes.func.isRequired,
  lookup: PropTypes.arrayOf(PropTypes.string),
  search: PropTypes.string,
};

FiltersForm.defaultProps = {
  search: '',
  lookup: [],
};

export default FiltersForm;
