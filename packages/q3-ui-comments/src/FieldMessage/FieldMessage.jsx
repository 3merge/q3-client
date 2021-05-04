import React from 'react';
import PropTypes from 'prop-types';
import { Adapters } from 'q3-ui-rte';
import { Builders } from 'q3-ui-forms';
import { compact } from 'lodash';

const FieldMessage = ({ collectionName, id }) => {
  const path = compact([collectionName, id]).join('/');
  const upload = path
    ? Adapters.toQ3Api(`/${path}`)
    : undefined;

  return (
    <Builders.Field
      name="message"
      type="editor"
      multiline
      rows={4}
      xl={12}
      lg={12}
      upload={upload}
      autofocus
    />
  );
};

FieldMessage.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FieldMessage;
