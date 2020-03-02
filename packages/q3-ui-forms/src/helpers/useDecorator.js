import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { useTranslation } from 'react-i18next';
import { getIn, useFormikContext } from 'formik';

const parseEventValue = (e) =>
  typeof e === 'object' && e.target ? e.target.value : e;

const filterValue = (a, v) => a.filter((i) => i !== v);

const hasValue = (a, v) =>
  a.findIndex((i) => i === v) !== -1;

export class FormikDecorator {
  constructor(name, formikBag, isDisabled) {
    if (!formikBag || typeof formikBag !== 'object')
      throw new Error('Requires formik bag');

    this.name = name;
    this.rawValue = getIn(formikBag.values, name);
    this.error = getIn(formikBag.errors, name);
    this.disabled = formikBag.isSubmitting || isDisabled;

    this.$fn = formikBag.setFieldValue.bind(formikBag);
    this.$validate = formikBag.validateField.bind(
      formikBag,
    );
  }

  set rawValue(v) {
    this.value = v !== undefined && v !== null ? v : '';
  }

  set helper(t) {
    if (this.error) {
      this.helperText = this.error;
      this.error = true;
    } else if (t.localeCompare(this.name) === 0) {
      this.helperText = null;
    } else {
      this.helperText = t;
    }
  }

  next(v) {
    return this.$fn(this.name, v)
      .then(() => this.$validate(this.name))
      .catch(() => {
        // noop
      });
  }

  onBlur() {
    // noop
  }

  onChange(e) {
    return this.next(parseEventValue(e));
  }

  onArrayPush(e) {
    const newValue = parseEventValue(e);

    if (!Array.isArray(this.value)) {
      return this.next([newValue].flat());
    }

    if (Array.isArray(newValue)) {
      return this.next(newValue);
    }

    return this.next(
      !hasValue(this.value, newValue)
        ? this.value.concat(newValue)
        : filterValue(this.value, newValue),
    );
  }

  onArrayPull(e) {
    const newValue = parseEventValue(e);
    return this.next(
      Array.isArray(this.value)
        ? filterValue(this.value, newValue)
        : [],
    );
  }

  get() {
    return {
      id: this.name,
      onChange: this.onChange.bind(this),
      onBlur: this.onBlur.bind(this),
      onArrayPush: this.onArrayPush.bind(this),
      onArrayPull: this.onArrayPull.bind(this),
      ...pick(this, [
        'disabled',
        'error',
        'helperText',
        'label',
        'value',
        'multiline',
        'rows',
      ]),
    };
  }
}

export const formikProps = PropTypes.shape({
  isSubmitting: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func,
});

export default ({
  overrides = {},
  vars = {},
  disabled,
  name,
  label,
  ...rest
}) => {
  const { t } = useTranslation();
  const formik = useFormikContext();
  const propper = new FormikDecorator(
    name,
    formik,
    disabled,
  );

  const finalFieldLabel = label || name;

  propper.helper = t(`helpers:${finalFieldLabel}`, vars);
  propper.label = t(`labels:${finalFieldLabel}`, vars);

  return {
    ...rest,
    ...propper.get(),
    ...overrides,
    vars,
    name,
  };
};
