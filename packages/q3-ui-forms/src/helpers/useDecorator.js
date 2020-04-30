import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { useTranslation } from 'react-i18next';
import { getIn, useFormikContext } from 'formik';
import { array } from 'q3-ui-helpers';

const parseEventValue = (e) =>
  typeof e === 'object' && e.target ? e.target.value : e;

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

  onChange(e) {
    return this.next(parseEventValue(e));
  }

  onArrayPush(e) {
    return this.next(
      array.addToSet(this.value, parseEventValue(e)),
    );
  }

  onArrayPull(e) {
    return this.next(
      array.pullFromSet(this.value, parseEventValue(e)),
    );
  }

  get() {
    return {
      id: this.name,
      onChange: this.onChange.bind(this),
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
  helper,
  suppressLabel,
  suppressHelper,
  ...rest
}) => {
  const { t } = useTranslation();
  const formik = useFormikContext();
  const propper = new FormikDecorator(
    name,
    formik,
    disabled,
  );

  if (!suppressLabel)
    propper.label = t(`labels:${label || name}`, vars);

  if (!label) propper.helper = t(`helpers:${name}`, vars);
  if (helper) propper.helper = t(`helpers:${helper}`, vars);
  if (suppressHelper) propper.helper = '';

  return {
    ...rest,
    ...propper.get(),
    ...overrides,
    vars,
    name,
  };
};
