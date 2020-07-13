import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import GatsbyImage from 'gatsby-image';
import { AbsoluteCover } from 'q3-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import HeaderTagline from '../HeaderTagline';
import ContentMediaIframeFab from '../ContentMediaIframeFab';
import ContentMediaModal from '../ContentMediaModal';
import withYoutubeEmbed from '../withYoutubeEmbed';

const HeaderTaglineWithFeaturedVideoBackground = ({
  embed,
  youtubeTitle,
  title,
  description,
  imageProps,
  offset,
}) => (
  <Box
    py={8}
    pt={offset}
    minHeight="100vh"
    position="relative"
  >
    <AbsoluteCover>
      <GatsbyImage
        {...imageProps}
        style={{ height: '100%', width: '100%' }}
      />
      <AbsoluteCover backgroundColor="rgba(0,0,0,0.65)" />
    </AbsoluteCover>
    <Box position="relative" style={{ color: '#FFF' }}>
      <HeaderTagline title={title}>
        <Box my={8}>
          <ContentMediaIframeFab
            height={500}
            title={youtubeTitle}
            embed={embed}
          >
            {(Player, Frame) => (
              <ContentMediaModal
                title={youtubeTitle}
                media={<Frame />}
              >
                {(toggle) => <Player onClick={toggle} />}
              </ContentMediaModal>
            )}
          </ContentMediaIframeFab>
        </Box>
        <Container maxWidth="sm">
          <Typography color="inherit">
            {description}
          </Typography>
        </Container>
      </HeaderTagline>
    </Box>
  </Box>
);

HeaderTaglineWithFeaturedVideoBackground.defaultProps = {
  offset: 8,
};

HeaderTaglineWithFeaturedVideoBackground.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  youtubeTitle: PropTypes.string.isRequired,
  embed: PropTypes.string.isRequired,
  offset: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default withYoutubeEmbed(
  HeaderTaglineWithFeaturedVideoBackground,
);
