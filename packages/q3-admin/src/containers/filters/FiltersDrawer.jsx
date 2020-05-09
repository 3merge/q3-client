import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'q3-ui-dialog';
import FiltersForm from './FiltersForm';

const FiltersDrawer = ({
  children,
  formFields,
  ...props
}) => {
  return (
    <Dialog
      variant="drawer"
      title="customizeFilter"
      renderTrigger={children}
      renderContent={() => (
        <FiltersForm {...props}>{formFields}</FiltersForm>
      )}
    />
  );
};

FiltersDrawer.propTypes = {
  children: PropTypes.func.isRequired,
  formFields: PropTypes.oneOf(
    PropTypes.node,
    PropTypes.array,
  ).isRequired,
};

export default FiltersDrawer;
