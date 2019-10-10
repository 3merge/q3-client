import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { invoke } from 'lodash';
import Swiper from 'react-id-swiper';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import 'react-id-swiper/lib/styles/css/swiper.css';

const float = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
};

const useStyle = makeStyles(() => ({
  btnPrev: {
    ...float,
    left: 0,
  },
  btnNext: {
    ...float,
    right: 0,
  },
  root: {
    position: 'relative',
  },
}));

const PaginationButtons = ({
  back,
  next,
  isFirst,
  isLast,
}) => {
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

PaginationButtons.propTypes = {
  isFirst: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

const PaginationSteppers = ({
  withButtons,
  isFirst,
  isLast,
  current,
  length,
  back,
  next,
}) => {
  const { t } = useTranslation('labels');
  const toggles = {
    nextButton: withButtons ? (
      <Button size="small" onClick={next} disabled={isLast}>
        {t('next')}
        <KeyboardArrowRight />
      </Button>
    ) : (
      <div />
    ),
    backButton: withButtons ? (
      <Button
        size="small"
        onClick={back}
        disabled={isFirst}
      >
        <KeyboardArrowLeft />
        {t('back')}
      </Button>
    ) : (
      <div />
    ),
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination for Slider"
    >
      <MobileStepper
        {...toggles}
        variant="dots"
        position="static"
        activeStep={current}
        steps={length}
      />
    </nav>
  );
};

PaginationSteppers.propTypes = {
  withButtons: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  ...PaginationButtons.propTypes,
};

const Slider = ({
  slides,
  withButtons,
  withSteppers,
  xs,
  sm,
  md,
  lg,
}) => {
  const [swiper, updateSwiper] = React.useState(null);
  const { root } = useStyle();
  const [currentIndex, updateCurrentIndex] = React.useState(
    0,
  );

  const params = {
    spaceBetween: 15,
    breakpoints: {
      1024: {
        slidesPerView: lg,
      },
      768: {
        slidesPerView: md,
      },
      640: {
        slidesPerView: sm,
      },
      320: {
        slidesPerView: xs,
      },
    },
  };

  const toggle = {
    isFirst: currentIndex === 0,
    isLast: currentIndex === slides.length - 1,
    back() {
      invoke(swiper, 'slidePrev');
    },
    next() {
      invoke(swiper, 'slideNext');
    },
  };

  React.useEffect(() => {
    if (swiper !== null)
      swiper.on('slideChange', () =>
        updateCurrentIndex(swiper.realIndex),
      );
  }, [swiper]);

  return (
    <Container maxWidth="xl" className={root}>
      <Swiper {...params} getSwiper={updateSwiper}>
        {slides.map(({ id, Component }) => (
          <div key={id}>
            <Component />
          </div>
        ))}
      </Swiper>
      {!withSteppers && withButtons && (
        <PaginationButtons {...toggle} />
      )}
      {withSteppers && (
        <PaginationSteppers
          withButtons={withButtons}
          current={currentIndex}
          length={slides.length}
          {...toggle}
        />
      )}
    </Container>
  );
};

Slider.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  withButtons: PropTypes.bool,
  withSteppers: PropTypes.bool,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      Component: PropTypes.node,
    }),
  ),
};

Slider.defaultProps = {
  slides: [],
  withSteppers: false,
  withButtons: false,
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
};

export default Slider;
