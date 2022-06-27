import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { Builders } from 'q3-ui-forms';
import { Definitions } from '../../containers/state';
import useAdd from '../../hooks/useAdd';
import AddNewSubmitButton from '../AddNewSubmitButton';

const AddNewForm = ({ children, close, ...props }) => {
  const { collectionName } = React.useContext(Definitions);
  const [options, setOptions] = React.useState({
    closeOnComplete: false,
    redirectToNewDocument: true,
    resetOnComplete: false,
    showSuccessMessage: false,
  });

  const onSubmit = useAdd(options);
  const executeCloseFn = (fn) =>
    isFunction(fn) && options.closeOnComplete
      ? fn
      : // simply forward the response
        (x) => x;

  const handleSubmit = (...args) =>
    onSubmit(...args).then(executeCloseFn(close));

  return (
    <Builders.Form
      collectionName={collectionName}
      enableSubmit={false}
      isNew
      onSubmit={handleSubmit}
      restart={options.resetOnComplete}
      showSuccessMessage={options.showSuccessMessage}
      {...props}
    >
      {children}
      <AddNewSubmitButton
        options={options}
        setOptions={setOptions}
      />
    </Builders.Form>
  );
};

AddNewForm.defaultProps = {};

AddNewForm.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};

export default AddNewForm;
