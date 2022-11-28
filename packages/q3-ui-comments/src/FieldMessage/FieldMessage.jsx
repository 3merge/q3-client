import React from 'react';
import PropTypes from 'prop-types';
import { Adapters } from 'q3-ui-rte';
import { Builders } from 'q3-ui-forms';

const FieldMessage = ({ collectionName, fieldId, id }) => (
  <Builders.Field
    id={fieldId}
    upload={Adapters.toQ3Api(`/${collectionName}/${id}`)}
    name="message"
    type="editor"
    multiline
    rows={4}
    xl={12}
    lg={12}
    autofocus
    autosave
    autosaveInterval={1500}
  />
);

FieldMessage.propTypes = {
  collectionName: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FieldMessage;
