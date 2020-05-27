import dot from 'dot-helpers';
import { merge } from 'lodash';
import { object } from 'q3-ui-helpers';

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
) => ({
  onSubmit: (values, actions) => {
    const newValues = dot.translateAndModify(
      values,
      marshal,
    );

    return onSubmit(
      marshalSelectively
        ? merge({}, values, newValues)
        : newValues,
      actions,
    );
  },

  initialValues: dot.modify(
    merge(
      {},
      dot.keep(data, keep),
      object.hasKeys(translate)
        ? dot.translate(data, translate)
        : {},
    ),
    modify,
  ),
});
