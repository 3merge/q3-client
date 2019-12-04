import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import { get } from 'lodash';
import Input, {
  DesktopSelect,
  DateSelect,
  Check,
  RadioSet,
  CheckSet,
} from 'q3-ui/lib/inputs';
import Grid from '@material-ui/core/Grid';
import Autocomplete from 'q3-ui/lib/autocomplete';
import Transfer from 'q3-ui/lib/transfer';
import { useAuth } from 'q3-ui-permissions';
import * as yup from 'yup';
import Comparison from 'comparisons';

const inputMap = {
  select: DesktopSelect,
  date: DateSelect,
  text: Input,
  default: Input,
  checkbox: Check,
  checkgroup: CheckSet,
  radio: RadioSet,
  transfer: Transfer,
  autocomplete: Autocomplete,
};

export const findValidations = (fields = {}) =>
  yup.object().shape(
    Object.entries(fields).reduce(
      (acc, [key, { validate }]) => {
        if (validate) acc[key] = validate;
        return acc;
      },
      {},
    ),
  );

export const ComponentSwitcher = ({
  name,
  type,
  values,
  conditional,
  colMd,
  colSm,
  ...rest
}) => {
  const FormElement = inputMap[type] || inputMap.default;
  const dynamicProp = {};

  const meetsConditionalRequirements =
    !conditional ||
    (values && new Comparison(conditional).eval(values));

  if (['number', 'tel', 'email'].includes(type))
    dynamicProp.type = type;

  if (typeof rest.options === 'function')
    Object.assign(dynamicProp, {
      options: rest.options(values),
    });

  return meetsConditionalRequirements ? (
    <Grid
      item
      md={colMd}
      sm={colSm}
      xs={12}
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <FormElement name={name} {...rest} {...dynamicProp} />
    </Grid>
  ) : null;
};

ComponentSwitcher.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  values: PropTypes.shape({}).isRequired,
  conditional: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  colMd: PropTypes.number,
  colSm: PropTypes.number,
};

ComponentSwitcher.defaultProps = {
  conditional: null,
  colMd: 12,
  colSm: 12,
};

const FromJson = ({
  formik: { values, errors },
  json: {
    createdBy,
    subfield,
    fields,
    collectionName,
    bypassAuthorization,
    isNew,
  },
}) => {
  const { isDisabled, isDisabledPrefix } = useAuth(
    collectionName,
    get(createdBy, 'id'),
  );

  let authFn = subfield
    ? isDisabledPrefix(subfield)
    : isDisabled;

  if (bypassAuthorization) authFn = null;

  return (
    <Grid container spacing={1}>
      {Object.entries(fields).map(([key, value]) => (
        <ComponentSwitcher
          {...value}
          key={key}
          name={key}
          values={values}
          errors={errors}
          authFn={authFn}
          isNew={isNew}
        />
      ))}
    </Grid>
  );
};

export const withValidation = (args) => () =>
  findValidations(args);

export const withJsonFields = (json) => ({
  isNew,
  ...args
}) => (
  <FromJson
    formik={args}
    json={Object.assign(json, { isNew })}
  />
);

export default connect(FromJson);
