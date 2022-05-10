import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const DialogFooter = ({ onNext, onPrev }) => {
  const { t } = useTranslation();

  if (!onPrev || !onNext) return null;

  return (
    <BottomNavigation
      showLabels
      style={{ justifyContent: 'space-between' }}
    >
      {onPrev && (
        <BottomNavigationAction
          label={t('labels:previous')}
          icon={<NavigateBeforeIcon />}
          onClick={onPrev}
        />
      )}

      {onNext && (
        <BottomNavigationAction
          label={t('labels:next')}
          icon={<NavigateNextIcon />}
          onClick={onNext}
        />
      )}
    </BottomNavigation>
  );
};

DialogFooter.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};

DialogFooter.defaultProps = {
  onPrev: undefined,
  onNext: undefined,
};

export default DialogFooter;
