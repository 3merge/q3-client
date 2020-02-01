import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-id-swiper';
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import useStyle from '../useStyle';

const Preview = ({ preview, id }) => {
  const { t } = useTranslation('labels');
  const { thumb } = useStyle();

  return (
    <Box className={thumb}>
      <img
        alt={t('thumbnailFor', { index: id })}
        src={preview}
      />
    </Box>
  );
};

Preview.propTypes = {
  /**
   * Unique index for this slide.
   */
  id: PropTypes.string.isRequired,

  /**
   * An image URI
   */
  preview: PropTypes.string.isRequired,
};

const Steps = ({
  withThumbnails,
  swiper,
  current,
  slides,
}) => {
  const { t } = useTranslation('labels');
  const [thumbnails, setThumbnails] = React.useState(null);
  const { thumbs } = useStyle();

  React.useEffect(() => {
    if (swiper && thumbnails) {
      // eslint-disable-next-line
      swiper.controller.control = thumbnails;
      thumbnails.controller.control = swiper;
    }
  }, [swiper, thumbnails]);

  const args = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    getSwiper: setThumbnails,
  };

  return (
    <Box
      role="navigation"
      component="div"
      aria-label={t('labels:dotPagination')}
    >
      {withThumbnails ? (
        <Swiper {...args} containerClass={thumbs}>
          {slides.map((slide, i) => (
            <div
              role="button"
              key={`${slide}=${i}`}
              style={{ width: 75 }}
            >
              <Preview {...slide} id={i} />
            </div>
          ))}
        </Swiper>
      ) : (
        <MobileStepper
          variant="dots"
          position="static"
          activeStep={current}
          steps={slides.length}
          style={{ backgroundColor: 'transparent' }}
          nextButton={<div style={{ height: '1rem' }} />}
          backButton={<div style={{ height: '1rem' }} />}
        />
      )}
    </Box>
  );
};

Steps.propTypes = {
  /**
   * Replace dot indexing with thumbnails.
   */
  withThumbnails: PropTypes.bool,

  /**
   * The active index. This will highlight a step in the stepper UI.
   */
  current: PropTypes.number.isRequired,

  /**
   * The slide components rendered in the parent Slider.
   * Used for thumbnail and dot generation.
   */
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      preview: PropTypes.string,
    }),
  ),

  /**
   * Parent Slider  instance
   */
  swiper: PropTypes.shape({
    controller: PropTypes.shape({
      control: PropTypes.object,
    }),
  }).isRequired,
};

Steps.defaultProps = {
  slides: [],
  withThumbnails: false,
};

export default Steps;
