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

  return children(
    <Checkbox
      edge="start"
      checked={checked}
      onChange={handleChange}
    />,
  );
};

CheckListItemCheckbox.defaultProps = {
  checked: false,
};

export default CheckListItemCheckbox;

// save unfinished?
