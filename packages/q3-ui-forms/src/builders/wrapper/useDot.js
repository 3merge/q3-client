import dot from 'dot-helpers';
import { merge } from 'lodash';
import { object } from 'q3-ui-helpers';

export default (
  {
    keep = [],
    marshal = {},
    modify = {},
    translate = {},
    onSubmit,
  },
  data,
) => ({
  onSubmit: (values, actions) =>
    onSubmit(
      dot.translateAndModify(values, marshal),
      actions,
    ),

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
