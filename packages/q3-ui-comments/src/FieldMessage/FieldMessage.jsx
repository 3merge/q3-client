import React from 'react';
import PropTypes from 'prop-types';
import { Adapters } from 'q3-ui-rte';
import { Builders } from 'q3-ui-forms';

const FieldMessage = ({ collectionName, id }) => (
  <Builders.Field
    upload={Adapters.toQ3Api(`/${collectionName}/${id}`)}
    name="message"
    type="editor"
    multiline
    rows={4}
    xl={12}
    lg={12}
    autofocus
  />
);

FieldMessage.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FieldMessage;
