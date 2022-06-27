import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { Definitions } from '../../containers/state';
import useAdd from '../../hooks/useAdd';

const AddNew = ({ children, close }) => {
  const { collectionName } = React.useContext(Definitions);
  const onSubmit = useAdd({});

  const handleSubmit = (...args) =>
    onSubmit(...args).then(close);

  return isFunction(onSubmit)
    ? React.cloneElement(children, {
        collectionName,
        isNew: true,
        onSubmit: handleSubmit,
      })
    : null;
};

AddNew.defaultProps = {};

AddNew.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};

export default AddNew;
