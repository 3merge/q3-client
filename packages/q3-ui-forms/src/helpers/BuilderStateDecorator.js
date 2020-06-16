import { get, pick } from 'lodash';
import { array, object } from 'q3-ui-helpers';

const parseEventValue = (e) =>
  typeof e === 'object' && e.target ? e.target.value : e;

export default class BuilderStateDecorator {
  constructor(name, context, isDisabled) {
    this.name = name;
    this.rawValue = get(context, 'value', '');
    this.error = get(context, 'error', null);
    this.disabled = context.isSubmitting || isDisabled;
    this.onStateChange = context.onChange.bind(context);
  }

  set rawValue(v) {
    this.value = v !== undefined && v !== null ? v : '';
  }

  set helper(t = '') {
    if (this.error && typeof this.error === 'string') {
      this.helperText = this.error;
      this.error = true;
    } else if (t.localeCompare(this.name) === 0) {
      this.helperText = null;
    } else if (t) {
      this.helperText = t;
    }
  }

  next(v) {
    return this.onStateChange(this.name, v);
  }

  onChange(e, newValue, mutator) {
    let val;

    if (e === null) {
      val = '';
    } else if (newValue) {
      val = newValue;
    } else {
      val = parseEventValue(e);
    }

    if (object.isFn(mutator)) val = mutator(val);

    return this.next(val);
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
