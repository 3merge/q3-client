import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Keyboard from '@material-ui/icons/Keyboard';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const DialogFooter = ({ onClose, onNext, onPrev }) => {
  const { t } = useTranslation();

  return (
    onPrev &&
    onNext && (
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label={t('labels:previous')}
          icon={<NavigateBeforeIcon />}
          onClick={onPrev}
        />
        <BottomNavigationAction
          label={t('labels:escape')}
          icon={<Keyboard />}
          onClick={onClose}
        />
        <BottomNavigationAction
          label={t('labels:next')}
          icon={<NavigateNextIcon />}
          onClick={onNext}
        />
      </BottomNavigation>
    )
  );
};

DialogFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default DialogFooter;
