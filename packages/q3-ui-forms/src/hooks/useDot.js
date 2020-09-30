import dot from 'dot-helpers';
import { mergeWith } from 'lodash';
import flat from 'flat';
import InitialValuesTranslator from '../helpers/InitialValuesTranslator';

const replaceWithArray = (
  objValue,
  srcValue,
  key,
  object,
  source,
  stack,
) => {
  // console.log(objValue);
  // console.log(srcValue);
  // console.log(key);
};

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
  const runMarshalOptions = (callback) => (
    values,
    ...rest
  ) => {
    const expanded = flat.unflatten(values);
    const newValues = dot.translateAndModify(
      expanded,
      marshal,
    );

    console.log('expanded', expanded);
    console.log('newValues', newValues);
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
