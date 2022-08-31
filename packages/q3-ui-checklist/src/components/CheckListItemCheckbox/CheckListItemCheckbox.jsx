import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { object } from 'q3-ui-helpers';
import CheckListContext from '../CheckListContext';

const CheckListItemCheckbox = ({
  id,
  checked,
  children,
}) => {
  const { patch } = React.useContext(CheckListContext);

  const handleChange = (event) =>
    object.noop(
      patch(id)({
        checked: Boolean(event.target.checked),
      }),
    );

  // FORCE UPDATE.
  // FOR EACH THING WE"RE DOING.

  return children(
    <Checkbox
      checked={checked}
      onChange={handleChange}
      style={{ margin: 0 }}
    />,
    checked,
  );
};

CheckListItemCheckbox.defaultProps = {
  checked: false,
};

export default CheckListItemCheckbox;

// save unfinished?
