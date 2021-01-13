import { get, isPlainObject, omit } from 'lodash';

const getTargetValue = (event) =>
  get(event, 'target.value', '');

/**
 * Some MUI handlers interpret the new value for us.
 * We should accept the value when given before parsing the event object.
 */
export const simulateEventHandler = (fn, name) => (
  event,
  newValue,
) => {
  return fn({
    target: {
      value: newValue || getTargetValue(event),
      name,
    },
  });
};
/**
 * An option will not allows be key-value pair.
 * Sometimes, it's just plain text.
 * As well, particularly for populated results,
 * the label might contain fallback text until hydrated.
 */
export const getLabelWithFallback = (value) => (option) => {
  if (isPlainObject(option)) return option.label;
  if (isPlainObject(value) && value.value === option)
    return value.label;

  return option;
};

/**
 * Before passing the decorated props in the MUI component,
 * we should strip anything that is not valid html,
 * as MUI just forwards everything into the DOM.
 */
export const removeDecoratedProps = (props) =>
  omit(props, [
    'onArrayPull',
    'onArrayPush',
    'suppressLabel',
  ]);

// getLabel:: [String] -> [{label, value}]) -> [value]
/**
 * Transform array of selected values to array of its label
 */
export const valueToLabel = (original) => (selected) =>
  Array.isArray(selected)
    ? selected.map((x) => {
        const item = original.find(
          ({ value }) => String(value) === x,
        );
        return item.label;
      })
    : selected;
