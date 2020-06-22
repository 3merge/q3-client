import * as yup from 'yup';
import { get } from 'lodash';
import moment from 'moment';
import { browser, string, object } from 'q3-ui-helpers';

export const VALIDATION_OPTIONS = [
  'min',
  'max',
  'lessThan',
  'moreThan',
  'enum',
  'required',
  'positive',
  'negative',
  'trim',
  'ensure',
  'lowercase',
  'uppercase',
];

export const checkIfEmpty = (v) =>
  !browser.isDefined(v) ||
  (!string.hasLength(v) && !object.hasKeys(v));

export const checkIfRequired = (ctx) =>
  get(ctx, 'schema._exclusive.required', false);

const isRequired = (re, value, ctx) =>
  checkIfRequired(ctx)
    ? re.test(value)
    : re.test(value) || value === '' || value === undefined;

export function hasMixedValue(v) {
  return !(checkIfEmpty(v) && checkIfRequired(this));
}

export function postal(v) {
  return isRequired(
    new RegExp(
      /^[0-9]{5}$|^[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]$/,
      'i',
    ),
    v,
    this,
  );
}

export function tel(v) {
  return isRequired(
    new RegExp(
      /^([+]?\d{1,2}[.\-\s]?)?(\()?(\d{3})(\)|-)?(\d{3})(-)?(\d{4})(((x)(\d)*)?)/,
      'i',
    ),
    typeof v === 'string' ? v.replace(/\s/g, '') : '',
    this,
  );
}

export function autocomplete(v) {
  const hasValue = v && typeof v === 'object' && v.value;
  return checkIfRequired(this)
    ? hasValue || hasValue === undefined
    : true;
}

export function emptyStringToNull(value, originalValue) {
  if (
    typeof originalValue === 'string' &&
    originalValue === ''
  ) {
    return null;
  }
  return value;
}

export const mapToValue = (enumValues = []) => ({
  enum: enumValues,
  type: 'select',
  options: enumValues.map((value) => ({
    label: value,
    value,
  })),
});

export const getOptions = (opts) => {
  if (typeof opts === 'object' && opts.type) return opts;
  if (typeof opts === 'string') return { type: opts };

  if (Array.isArray(opts))
    return {
      type: 'select',
      ...mapToValue(opts),
    };

  throw new Error('Requires a field type');
};

export class Validator {
  constructor(options) {
    Object.assign(this, getOptions(options), {
      $base: yup,
    });
  }

  checkTypes() {
    switch (this.type) {
      case 'text':
      case 'string':
      case 'editor':
      case 'password':
      case 'transfer':
      case 'file':
        this.$base = this.$base.string();
        break;
      case 'email':
        this.$base = this.$base.string().email();
        break;
      case 'url':
        this.$base = this.$base.string().url();
        break;
      case 'tel':
        this.$base = this.$base
          .string()
          .test(
            'is-tel',
            'Must be a valid telephone number',
            tel,
          );
        break;
      case 'postal':
        this.$base = this.$base
          .string()
          .test(
            'is-postal',
            'Must be a valid postal code',
            postal,
          );
        break;
      case 'number':
        this.$base = this.$base
          .number()
          .transform(emptyStringToNull)
          .nullable();
        break;
      case 'checkbox':
        this.$base = this.$base.lazy((value) => {
          switch (typeof value) {
            case 'number':
              return yup.number();
            case 'boolean':
              return yup.boolean();
            case 'string':
              return yup.string();
            default:
              return yup.mixed();
          }
        });

        break;

      case 'date':
        this.$base = this.$base
          .string()
          .test(
            'is-date',
            // eslint-disable-next-line
            '${path} is not an acceptable date value',
            (value) => !value || moment(value).isValid(),
          )
          .nullable();
        break;
      case 'multi':
      case 'multiselect':
      case 'multitext':
      case 'checkset':
      case 'chips':
      case 'dateRange':
      case 'range':
        this.$base = this.$base.array().ensure();
        break;
      case 'autocomplete':
        this.$base = this.$base
          .mixed()
          .test(
            'is-autocomplete',
            'This input requires you to make a selection',
            autocomplete,
          );
        break;
      case 'radio':
      case 'select':
      case 'selectable':
        this.$base = this.$base
          .mixed()
          .test(
            'is-required',
            'This is a required field',
            hasMixedValue,
          );
        break;
      default:
        break;
    }
  }

  checkOptions(a = []) {
    this.$base = a.reduce(
      (chain, method) =>
        this[method] && chain[method]
          ? chain[method](
              typeof this[method] !== 'boolean'
                ? this[method]
                : undefined,
            )
          : chain,
      this.$base,
    );
  }

  checkEnum() {
    if (this.enum) this.$base = this.$base.oneOf(this.enum);
  }

  build() {
    // skip everything for custom
    if (this.validate) return this.validate;
    this.checkTypes();
    this.checkEnum();

    this.checkOptions(VALIDATION_OPTIONS);
    return this.$base;
  }
}

const getValidation = (fields = {}) =>
  yup.object().shape(
    Object.entries(fields).reduce((acc, [key, options]) => {
      const defaultValidation = new Validator(
        options,
      ).build();

      if (defaultValidation) acc[key] = defaultValidation;
      return acc;
    }, {}),
  );

export const withValidation = (schema) => () =>
  getValidation(schema);

export default getValidation;
