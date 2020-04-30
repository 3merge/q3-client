import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { object } from 'q3-ui-helpers';
import { EditableTypography } from 'q3-ui-forms-presets';
import RepeaterState from './state';

const { hasKeys } = object;

const EditableTypographyWrapper = ({
  data,
  children,
  editable,
  name,
  ...rest
}) => {
  const repeater = React.useContext(RepeaterState);
  const prefixedName = `${repeater.name}.${name}`;

  const isEditable =
    typeof repeater.edit === 'function' &&
    invoke(repeater, 'auth.canEditSub', prefixedName) &&
    hasKeys(editable);

  if (
    !invoke(repeater, 'auth.canSeeSub', prefixedName) ||
    !children
  )
    return '--';

  return (
    <EditableTypography
      {...rest}
      isEditable={isEditable}
      renderer={editable.renderer}
      initialValues={data}
      data={data}
      fieldProps={{
        name: prefixedName,
        ...editable,
      }}
      onSubmit={(...params) =>
        repeater.edit(data.id)(...params)
      }
    >
      {children}
    </EditableTypography>
  );
};

EditableTypographyWrapper.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  editable: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    renderer: PropTypes.func,
  }),
  name: PropTypes.string.isRequired,
};

EditableTypographyWrapper.defaultProps = {
  children: '',
  editable: null,
};

export default EditableTypographyWrapper;
