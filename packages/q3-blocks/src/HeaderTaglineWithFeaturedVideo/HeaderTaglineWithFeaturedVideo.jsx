import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {
  AbsoluteCenter,
  AbsoluteCover,
} from 'q3-components';
import GatsbyImage from 'gatsby-image';
import Fade from '@material-ui/core/Fade';
import { useToggle } from 'useful-state';
import ContentMediaIframeFab from '../ContentMediaIframeFab';
import HeaderTagline from '../HeaderTagline';
import withYoutubeEmbed from '../withYoutubeEmbed';

const HeaderTaglineWithFeaturedVideo = ({
  youtubeTitle,
  thumbnail,
  embed,
  ...rest
}) => {
  const { toggle, state } = useToggle();

  return (
    <HeaderTagline {...rest}>
      <Box mt={4}>
        <Paper
          elevation={5}
          style={{ position: 'relative', height: 415 }}
        >
          <GatsbyImage
            alt={youtubeTitle}
            fluid={{ src: thumbnail }}
            style={{
              borderRadius: 5,
              height: 415,
              width: '100%',
            }}
          />
          <ContentMediaIframeFab
            embed={embed}
            title={youtubeTitle}
          >
            {(Player, Frame) => (
              <AbsoluteCover>
                <Fade in={state} unmountOnExit>
                  <Frame />
                </Fade>
                <AbsoluteCenter>
                  <Fade in={!state} unmountOnExit>
                    <Player onClick={toggle} />
                  </Fade>
                </AbsoluteCenter>
              </AbsoluteCover>
            )}
          </ContentMediaIframeFab>
        </Paper>
      </Box>
    </HeaderTagline>
  );
};

HeaderTaglineWithFeaturedVideo.propTypes = {
  youtubeTitle: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  embed: PropTypes.string.isRequired,
};

export default withYoutubeEmbed(
  HeaderTaglineWithFeaturedVideo,
);
