import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import Input, {
  DesktopSelect,
  DateSelect,
  Check,
  RadioSet,
  CheckSet,
  Multitext,
  Multiselect,
} from 'q3-ui/lib/inputs';
import Autocomplete from 'q3-ui/lib/autocomplete';
import Transfer from 'q3-ui/lib/transfer';
import { getForTransfer } from 'q3-ui-rest';
import Comparison from 'comparisons';
import { getOptions, mapToValue } from '../validations';
import withAuthorization from '../authorization';

const htmlFieldTypes = [
  'text',
  'number',
  'tel',
  'email',
  'url',
  'checkbox',
  'password',
  'search',
  'color',
];

const internalFieldTypes = {
  select: DesktopSelect,
  date: DateSelect,
  text: Input,
  default: Input,
  checkbox: Check,
  checkgroup: CheckSet,
  radio: RadioSet,
  transfer: Transfer,
  autocomplete: Autocomplete,
  multi: Multitext,
  multiselect: Multiselect,
};

export class FieldBuilder {
  constructor(type, props = {}, values = {}) {
    Object.assign(this, props, {
      type: htmlFieldTypes.includes(type) ? type : null,
      values,
    });
  }

  static is(type) {
    return (
      internalFieldTypes[type] || internalFieldTypes.default
    );
  }

  show() {
    return (
      !this.conditional ||
      (this.values &&
        new Comparison(this.conditional).eval(this.values))
    );
  }

  getOptions() {
    if (typeof this.loadOptions === 'object')
      Object.assign(this, {
        loadOptions: getForTransfer(
          this.loadOptions.url,
          this.loadOptions.key,
          this.loadOptions.field,
        ),
      });

    if (typeof this.options === 'function') {
      Object.assign(this, {
        options: this.options(this.values),
      });
    } else if (!this.options && this.enum) {
      Object.assign(this, mapToValue(this.enum));
    }
  }

  build() {
    this.getOptions();
    return this.show() ? this : null;
  }
}

export const ComponentSwitcher = ({
  type,
  values,
  ...rest
}) => {
  const FormElement = FieldBuilder.is(type);
  const inputProps = new FieldBuilder(
    type,
    rest,
    values,
  ).build();

  return inputProps && <FormElement {...inputProps} />;
};

ComponentSwitcher.propTypes = {
  type: PropTypes.string.isRequired,
  values: PropTypes.shape({}).isRequired,
};

ComponentSwitcher.defaultProps = {
  conditional: null,
};

const FromJson = ({
  json: { fields, ...rest },
  formik: { values, errors },
}) =>
  Object.entries(fields).map(([key, value]) =>
    withAuthorization(ComponentSwitcher, {
      ...rest,
      ...getOptions(value),
      name: key,
      values,
      errors,
    }),
  );

FromJson.propTypes = {
  json: PropTypes.shape({
    fields: PropTypes.object,
  }).isRequired,
  formik: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
  }).isRequired,
};

export const withJsonFields = (json) => ({
  isNew,
  ...args
}) => (
  <FromJson
    formik={args}
    json={Object.assign(json, {
      isNew,
    })}
  />
);

export default connect(FromJson);
