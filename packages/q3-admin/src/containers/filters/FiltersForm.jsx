import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import FilterLoading from './FilterLoading';
import { FiltersStore } from '../state';

const FiltersForm = ({ children, search, ...etc }) => {
  const filters = React.useContext(FiltersStore);

  return filters.fetching ? (
    <FilterLoading />
  ) : (
    <Fade in>
      <Box>
        <EncodedUrl query={search} {...etc}>
          {children(filters.fields, filters.getOptions)}
        </EncodedUrl>
      </Box>
    </Fade>
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
