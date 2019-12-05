import * as yup from 'yup';

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

class Validator {
  constructor(options) {
    Object.assign(this, getOptions(options), {
      $base: yup,
    });
  }

  checkTypes() {
    switch (this.type) {
      case 'text':
      case 'string':
        this.$base = this.$base.string();
        break;
      case 'email':
        this.$base = this.$base.string().email();
        break;
      case 'url':
        this.$base = this.$base.string().url();
        break;
      case 'tel':
        this.$base = this.$base.string();
        break;
      case 'number':
        this.$base = this.$base.number();
        break;
      case 'checkbox':
        this.$base = this.$base.boolean();
        break;
      case 'date':
        this.$base = this.$base.date();
        break;
      case 'multi':
      case 'multiselect':
      case 'multitext':
        this.$base = this.$base.array();
        break;
      case 'autocomplete':
        this.$base = this.$base.mixed().autocomplete();
        break;
      case 'select':
        this.$base = this.$base.mixed();
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

    this.checkOptions([
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
    ]);

    return this.$base;
  }
}

function postal() {
  return this.test((v) =>
    new RegExp(
      /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z]\s?\d[A-Z]\d$/,
      'i',
    ).test(v),
  );
}

function autocomplete() {
  return this.test((v) => typeof v === 'object' && v.value);
}

yup.addMethod(yup.string, postal.name, postal);
yup.addMethod(yup.mixed, autocomplete.name, autocomplete);

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
