import { get } from 'lodash';
import { getForAutocomplete } from 'q3-ui-rest';
import Comparison from 'comparisons';
import {
  Autocomplete,
  Checkbox,
  Checkset,
  DatePicker,
  DateRangePicker,
  Editor,
  Multiselect,
  Multitext,
  Radio,
  Text,
  Select,
  Selectable,
  Transfer,
  File,
  Chips,
  Range,
} from '../fields';
import { mapToValue } from './validation';

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
  'date',
  'file',
];

const internalFieldTypes = {
  select: Select,
  chips: Chips,
  date: DatePicker,
  dateRange: DateRangePicker,
  text: Text,
  postal: Text,
  default: Text,
  checkbox: Checkbox,
  checkset: Checkset,
  radio: Radio,
  transfer: Transfer,
  autocomplete: Autocomplete,
  range: Range,
  multitext: Multitext,
  multiselect: Multiselect,
  selectable: Selectable,
  editor: Editor,
  file: File,
};

export default class FieldBuilder {
  constructor(type, props = {}, values = {}) {
    Object.assign(this, props, {
      originalType: type,
      type: htmlFieldTypes.includes(type) ? type : null,
      values,
    });
  }

  static is(type) {
    return (
      internalFieldTypes[type] || internalFieldTypes.default
    );
  }

  hasValues() {
    return (
      this.values &&
      typeof this.values === 'object' &&
      Object.keys(this.values).length
    );
  }

  show() {
    return (
      !this.conditional ||
      (this.hasValues() &&
        new Comparison(this.conditional).eval(this.values))
    );
  }

  getOptions() {
    const ref = this.loadOptions;

    if (typeof this.loadOptions === 'object')
      Object.assign(this, {
        loadOptions: (e) =>
          getForAutocomplete(
            `${ref.url}&search=${e}${
              ref.append
                ? `&${ref.append.split('=')[0]}=${get(
                    this.values,
                    ref.append.split('=')[1],
                  )}`
                : ''
            }`,
            ref.key,
            ref.field,
            this.originalType === 'transfer',
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

  getRequired() {
    if (this.requiredIf && typeof this.values === 'object')
      this.required = new Comparison(this.requiredIf).eval(
        Object.entries(this.values).reduce(
          (prev, [key, value]) =>
            value !== '' &&
            value !== null &&
            value !== undefined
              ? Object.assign(
                  prev,
                  {
                    [key]: value,
                  },
                  {},
                )
              : {},
        ),
      );
  }

  build() {
    this.getOptions();
    this.getRequired();

    delete this.originalType;
    delete this.type;

    return this.show() ? this : null;
  }
}
