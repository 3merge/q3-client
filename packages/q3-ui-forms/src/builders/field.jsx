import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import BuilderState from './builderState';
import FieldDetector from '../helpers/types';
import { EventEmitter } from './wrapper';

const Field = ({
  name,
  override,
  type,
  under,
  ...rest
}) => {
  const el = React.useRef();
  const [attrs, setAttrs] = React.useState({});
  const { authorization, validation } = React.useContext(
    BuilderState,
  );

  const formik = useFormikContext();
  const subpath = under ? `${under}.${name}` : name;

  const canSee = authorization.checkReadAuthorizationContext(
    subpath,
  );

  const canEdit = authorization.checkEditAuthorizationContext(
    subpath,
  );

  React.useEffect(() => {
    const { values } = formik;
    const a = new FieldDetector(type, rest, values).build();

    if (override && typeof override === 'function' && a)
      Object.assign(a, override(formik, rest));

    if (!a && formik.values[name])
      setTimeout(() => formik.setFieldValue(name, ''));

    setAttrs(a);
    validation.setField(name, {
      ...a,
      type,
    });
  }, [
    rest.conditional || override
      ? JSON.stringify(formik.values)
      : undefined,
  ]);

  React.useEffect(() => {
    el.current = FieldDetector.is(type);
  }, []);

  return canSee && attrs && el.current
    ? React.createElement(el.current, {
        readOnly: !canEdit,
        disabled: !canEdit,
        ...attrs,
        type,
        name,
      })
    : null;
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  override: PropTypes.func,
  under: PropTypes.string,
};

Field.defaultProps = {
  override: null,
  under: null,
};

export default Field;
