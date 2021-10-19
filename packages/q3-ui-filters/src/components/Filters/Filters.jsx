import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { useLocation, useNavigate } from '@reach/router';
import { Adapters, Builders } from 'q3-ui-forms';
import FiltersChip from '../FiltersChip';
import FiltersStacked from '../FiltersStacked';

const Filters = ({ fields, variant }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const ComponentVariant =
    variant === 'stacked' ? FiltersStacked : FiltersChip;

  return (
    <Adapters.EncodedUrl
      location={location}
      navigate={navigate}
    >
      <ComponentVariant
        fields={map(fields, (field) => ({
          name: field.name,
          component: (
            <>
              <Builders.Field
                suppressLabel
                suppressHelper
                {...field}
              />
              <Builders.Next submit />
            </>
          ),
        }))}
      />
    </Adapters.EncodedUrl>
  );
};

Filters.defaultProps = {
  fields: [],
};

Filters.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Filters;
