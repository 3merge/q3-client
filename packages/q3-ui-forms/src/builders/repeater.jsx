import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Repeater from 'q3-ui/lib/repeater';
import { useAuth } from 'q3-ui-permissions';
import useRest from 'q3-ui-rest';

const applyMixin = (resource, mixin) => {
  if (!Array.isArray(resource) || !resource.length)
    return [];

  if (typeof mixin !== 'function') return resource;
  return resource.map(mixin);
};

const RepeaterFormBuilder = ({
  id,
  mixin,
  resourceName,
  resourceNameSingular,
  collectionName,
  createdBy,
  decorators,
  ...opts
}) => {
  const {
    canCreateSub,
    canEditSub,
    canDeleteSub,
  } = useAuth(collectionName, get(createdBy, 'id'));

  const {
    patch,
    post,
    remove,
    removeBulk,
    put,
    [resourceName]: data,
    ...rest
  } = useRest({
    url: `/${collectionName}/${id}/${resourceName}`,
    runOnInit: true,
    key: resourceNameSingular,
    pluralized: resourceName,
    decorators,
  });

  return (
    <Repeater
      {...{
        ...opts,
        ...rest,
        ...(canCreateSub(resourceName) && { create: post }),
        ...(canEditSub(resourceName) && { edit: patch }),
        ...(canDeleteSub(resourceName) && {
          deleteOne: remove,
        }),
      }}
      data={applyMixin(data, mixin)}
      description={resourceName}
      name={resourceName}
    />
  );
};

RepeaterFormBuilder.propTypes = {
  id: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  mixin: PropTypes.func,
  wizardProps: PropTypes.shape({
    initialValues: PropTypes.object,
  }).isRequired,
  createdBy: PropTypes.shape({
    id: PropTypes.string,
  }),
  decorators: PropTypes.shape({
    get: PropTypes.func,
    post: PropTypes.func,
    patch: PropTypes.func,
    delete: PropTypes.func,
    put: PropTypes.func,
  }),
};

RepeaterFormBuilder.defaultProps = {
  createdBy: null,
  decorators: null,
  mixin: null,
};

export default RepeaterFormBuilder;
