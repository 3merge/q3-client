import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import useStyle from '../useStyle';

const Pagination = ({ back, next, isFirst, isLast }) => {
  const { btnPrev, btnNext } = useStyle();
  const { t } = useTranslation('labels');

  return (
    <nav>
      <IconButton
        onClick={back}
        className={btnPrev}
        disabled={isFirst}
        aria-label={t('back')}
        size="small"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={next}
        className={btnNext}
        aria-label={t('next')}
        disabled={isLast}
        size="small"
      >
        <KeyboardArrowRight />
      </IconButton>
    </nav>
  );
};

Pagination.propTypes = {
  /**
   * When truthy, the back button is disabled.
   */
  isFirst: PropTypes.bool.isRequired,

  /**
   * When truthy, the next button is disabled.
   */
  isLast: PropTypes.bool.isRequired,

  /**
   * Handles on back events.
   */
  back: PropTypes.func.isRequired,

  /**
   * Handles on next events.
   */
  next: PropTypes.func.isRequired,
};

export default Pagination;
