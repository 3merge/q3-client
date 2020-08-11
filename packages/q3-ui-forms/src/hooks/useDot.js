import dot from 'dot-helpers';
import { merge } from 'lodash';
import flat from 'flat';
import InitialValuesTranslator from '../helpers/InitialValuesTranslator';

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

    const output = marshalSelectively
      ? merge({}, expanded, newValues)
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
