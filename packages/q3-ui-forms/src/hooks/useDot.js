import dot from 'dot-helpers';
import { merge } from 'lodash';
import InitialValuesTranslator from '../helpers/InitialValuesTranslator';

export default (
  {
    keep = [],
    marshal = {},
    modify = {},
    translate = {},
    marshalSelectively,
    onSubmit,
  },
  data,
) => {
  const runMarshalOptions = (callback) => (values) => {
    const newValues = dot.translateAndModify(
      values,
      marshal,
    );

    const output = marshalSelectively
      ? merge({}, values, newValues)
      : newValues;

    return callback ? callback(output) : output;
  };

  return {
    executeMarshal: runMarshalOptions,
    onSubmit: runMarshalOptions(onSubmit),

    initialValues: new InitialValuesTranslator(data)
      .translate(translate)
      .prune(keep)
      .modify(modify)
      .toString(),
  };
};
