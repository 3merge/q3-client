import React from 'react';
import { isFunction, map } from 'lodash';
import ButtonWithIcon from '../ButtonWithIcon';
import ButtonWithIconDialog from '../ButtonWithIconDialog';
import useCheckedStateRequirement from '../../hooks/useCheckedStateRequirement';
import useRegisterActions from '../../hooks/useRegisterActions';

const ActionBarTemplate = ({ registerActions }) => {
  const actions = useRegisterActions(registerActions);
  const hasCheckedState = useCheckedStateRequirement();

  return map(actions, (action) => {
    const El = isFunction(action.renderContent)
      ? ButtonWithIconDialog
      : ButtonWithIcon;

    return (
      <El
        {...action}
        key={action.label}
        disabled={
          action?.requireCheckedState && !hasCheckedState
        }
        transparent
      />
    );
  });
};

export default ActionBarTemplate;
