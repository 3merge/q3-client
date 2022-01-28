import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import Confirm from 'q3-ui-confirm';
import { useNavigate } from '@reach/router';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Definitions, Dispatcher } from '../state';
import ButtonWithIcon from '../../components/ButtonWithIcon';

const Trash = () => {
  const { t } = useTranslation('descriptions');
  const { directoryPath } = React.useContext(Definitions);
  const { remove } = React.useContext(Dispatcher);
  const navigate = useNavigate();

  const navigateOnResolve = () =>
    remove()()
      .then(() => {
        navigate(directoryPath);
      })
      .catch(() => {
        const e = new Error();
        e.message = t('trashFail');
        throw e;
      });

  const renderButton = React.useCallback(
    (buttonProps) =>
      React.createElement(ButtonWithIcon, {
        ...buttonProps,
        icon: DeleteIcon,
        label: 'trash',
      }),
    [],
  );

  return (
    <Confirm
      title="confirm"
      description="confirm"
      service={navigateOnResolve}
      label="addToTrash"
      phrase="DELETE"
      ButtonComponent={renderButton}
    />
  );
};

Trash.propTypes = {};

export default React.memo(Trash);
