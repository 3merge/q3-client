import React from 'react';
import { useFormikContext, useField } from 'formik';
import PropTypes from 'prop-types';
import BuilderState from './builderState';
import FieldDetector from '../helpers/types';
import useListen from '../helpers/useListen';

const Field = (props) => {
  const {
    name,
    override,
    type,
    under,
    disabled,
    ...rest
  } = props;

  useField(name);
  useListen(props);

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

  React.useEffect(() => {}, []);

  return canSee && attrs && el.current
    ? React.createElement(el.current, {
        disabled: !canEdit || Boolean(disabled),
        readOnly: !canEdit || Boolean(disabled),
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

Field.displayName = 'Field';

export default Field;
