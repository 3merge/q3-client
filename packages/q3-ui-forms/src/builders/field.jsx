import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import BuilderState from './builderState';
import FieldDetector from '../helpers/types';

const Field = ({ name, ...rest }) => {
  const [loading, setLoading] = React.useState(true);
  const ctx = React.useContext(BuilderState);
  const formik = useFormikContext();

  const FormElement = FieldDetector.is(rest.type);
  const inputProps = new FieldDetector(
    rest.type,
    rest,
    formik.values,
  ).build();

  React.useEffect(() => {
    ctx.validation.setField(name, rest);
  }, []);

  React.useEffect(() => {
    if (formik.status === 'Ready')
      setTimeout(() => setLoading(false), 250);
  }, [formik.status]);

  if (loading)
    return (
      <Skeleton
        variant="rect"
        style={{ marginBottom: '0.5rem' }}
        height={56}
      />
    );

  return inputProps ? (
    <FormElement name={name} {...inputProps} />
  ) : null;
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Field;
