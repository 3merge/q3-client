import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import LayersClear from '@material-ui/icons/LayersClear';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { State } from './Context';

const Unselect = () => {
  const { clear, checked } = React.useContext(State);
  const { t } = useTranslation();

  return (
    <BottomNavigationAction
      onClick={clear}
      icon={<LayersClear />}
      label={t('labels:unselect', {
        count: checked.length,
      })}
      showLabel
    />
  );
};

Unselect.propTypes = {};
Unselect.defaultProps = {};

export default Unselect;
