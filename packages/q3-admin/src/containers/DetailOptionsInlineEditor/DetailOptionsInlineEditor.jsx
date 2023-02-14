import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import { Editable } from 'q3-ui-forms/lib/adapters';
import { isObject } from 'lodash';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import connect from '../connect';

const DetailOptionsInlineEditor = ({
  data,
  editable,
  onSubmit,
  title,
  ...rest
}) => {
  const buttonComponent = (open) => (
    <div
      aria-label="edit"
      role="button"
      onClick={open}
      tabIndex={-1}
    >
      <EditIcon color="inherit" />
    </div>
  );

  return isObject(editable) ? (
    <Editable
      {...rest}
      {...editable}
      title={title}
      initialValues={data}
      onSubmit={onSubmit}
      buttonRenderer={buttonComponent}
    />
  ) : (
    <DoubleArrowIcon />
  );
};

DetailOptionsInlineEditor.defaultProps = {
  editable: null,
};

DetailOptionsInlineEditor.propTypes = {
  data: PropTypes.shape({ id: PropTypes.string })
    .isRequired,
  editable: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(DetailOptionsInlineEditor);
