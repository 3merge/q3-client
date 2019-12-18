import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import BuilderState from './builderState';
import FieldDetector from '../helpers/types';

const Field = ({
  name,
  override,
  type,
  under,
  ...rest
}) => {
  const el = React.useRef();
  const [loading, setLoading] = React.useState(true);
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

  const getInputOverrides = React.useCallback(
    () =>
      override &&
      typeof override === 'function' &&
      typeof inputProps === 'object'
        ? override(formik)
        : {},
    [formik.values],
  );

  React.useEffect(() => {
    const a = new FieldDetector(
      type,
      rest,
      formik.values,
    ).build();

    validation.setField(name, {
      ...a,
      ...getInputOverrides(),
      type,
    });

    setAttrs(a);
  }, [formik.values]);

  React.useEffect(() => {
    if (formik.status === 'Ready') {
      el.current = FieldDetector.is(type);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  }, [formik.status]);

  if (loading || !attrs || !el)
    return (
      <Skeleton
        name={name}
        variant="rect"
        style={{ margin: '4px 0' }}
        height={56}
      />
    );

  return canSee
    ? React.createElement(el.current, {
        readOnly: !canEdit,
        disabled: !canEdit,
        ...attrs,
        ...getInputOverrides(),
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
