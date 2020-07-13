import React from 'react';
import PropTypes from 'prop-types';
import GatsbyImage from 'gatsby-image';
import { AbsoluteCover } from 'q3-components';

const ContentBackgroundImage = ({
  imageProps,
  backgroundColor,
}) => (
  <AbsoluteCover>
    <GatsbyImage
      {...imageProps}
      style={{ height: '100%', width: '100%' }}
    />
    <AbsoluteCover backgroundColor={backgroundColor} />
  </AbsoluteCover>
);

ContentBackgroundImage.defaultProps = {
  backgroundColor: 'rgba(0,0,0,0.65)',
};

ContentBackgroundImage.propTypes = {
  backgroundColor: PropTypes.string,
  imageProps: PropTypes.shape({
    fluid: PropTypes.object,
    alt: PropTypes.string,
  }).isRequired,
};

export default ContentBackgroundImage;
