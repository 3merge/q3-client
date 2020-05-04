import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import Swiper from 'react-id-swiper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Steps from './steps';
import Pagination from './pagination';
import useStyle from './useStyle';

const Slider = ({
  slides,
  withButtons,
  withSteppers,
  withThumbnails,
  xs,
  sm,
  md,
  lg,
  slidesPerView,
}) => {
  const { root } = useStyle();
  const [swiper, updateSwiper] = React.useState(null);
  const [currentIndex, updateCurrentIndex] = React.useState(
    0,
  );

  const params =
    slidesPerView === 'auto'
      ? {
          spaceBetween: 30,
          slidesPerView: 'auto',
        }
      : {
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
    <Container maxWidth="xl">
      <Box className={root}>
        <Box>
          <Swiper {...params} getSwiper={updateSwiper}>
            {slides.map(({ id, Component, style = {} }) => (
              <div
                key={id}
                style={Object.assign(style, {
                  display: 'inline-block',
                })}
              >
                <Component />
              </div>
            ))}
          </Swiper>
        </Box>
        {withButtons && <Pagination {...toggle} />}
      </Box>
      {withSteppers || withThumbnails ? (
        <Steps
          swiper={swiper}
          withButtons={withButtons}
          withThumbnails={withThumbnails}
          current={currentIndex}
          slides={slides}
          {...toggle}
        />
      ) : null}
    </Container>
  );
};

Slider.propTypes = {
  /**
   * The number of slides to render for mobile devices.
   */
  xs: PropTypes.number,

  /**
   * The number of slides to render for tablet devices.
   */
  sm: PropTypes.number,

  /**
   * The number of slides to render for small laptop devices.
   */
  md: PropTypes.number,

  /**
   * The number of slides to render for desktop devices.
   */
  lg: PropTypes.number,

  /**
   * The default number of slides per view.
   */
  slidesPerView: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  /**
   * Enable back/next pagination.
   */
  withButtons: PropTypes.bool,

  /**
   * Include dot navigation.
   */
  withSteppers: PropTypes.bool,

  /**
   * Include thumbnail navigation.
   */
  withThumbnails: PropTypes.bool,

  /**
   * The slide components.
   */
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
  withThumbnails: false,
  slidesPerView: null,
  xs: 1,
  sm: 1,
  md: 1,
  lg: 1,
};

export default Slider;
