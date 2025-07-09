import dot from 'dot-helpers';
import { isFunction, mergeWith } from 'lodash';
import flat from 'flat';
import InitialValuesTranslator from '../helpers/InitialValuesTranslator';

const replaceWithArray = (objValue, srcValue) =>
  Array.isArray(objValue) && Array.isArray(srcValue)
    ? srcValue
    : undefined;

export default (
  {
    keep = [],
    unwind = [],
    marshal = {},
    modify = {},
    translate = {},
    marshalSelectively,
    onSubmit,
  },
  data,
) => {
  const runMarshalOptions =
    (callback) =>
    (values, ...rest) => {
      const expanded = flat.unflatten(values);
      const newValues = isFunction(marshal)
        ? marshal(expanded)
        : dot.translateAndModify(expanded, marshal);

      const output = marshalSelectively
        ? mergeWith(expanded, newValues, replaceWithArray)
        : newValues;

      return callback ? callback(output, ...rest) : output;
    };

  return {
    executeMarshal: runMarshalOptions,
    onSubmit: runMarshalOptions(onSubmit),

    initialValues: new InitialValuesTranslator(data)
      .translate(translate)
      .prune(keep)
      .modify(modify)
      .toString(unwind),
  };
};

