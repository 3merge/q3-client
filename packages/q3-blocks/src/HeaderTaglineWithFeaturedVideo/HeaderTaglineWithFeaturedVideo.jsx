import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import GatsbyImage from 'gatsby-image';
import { url } from 'q3-ui-helpers';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useTranslation } from 'react-i18next';
import ContentMediaModal from '../ContentMediaModal';
import HeaderTagline from '../HeaderTagline';

const HeaderTaglineWithFeaturedVideo = ({
  youtube,
  youtubeTitle,
  ...rest
}) => {
  const { thumbnail, embed } = url.getYoutube(youtube);
  const { t } = useTranslation();

  return (
    <HeaderTagline {...rest}>
      <Box mt={4}>
        <ContentMediaModal
          media={
            <iframe
              src={embed}
              style={{ height: 450, width: '100%' }}
              title={youtubeTitle}
              frameBorder="0"
              allowFullScreen
            />
          }
        >
          {(toggle) => (
            <Paper
              elevation={5}
              style={{ position: 'relative' }}
            >
              <GatsbyImage
                alt={youtubeTitle}
                fluid={{ src: thumbnail }}
                style={{
                  borderRadius: 5,
                  height: 350,
                  width: '100%',
                }}
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                style={{
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <Fab
                  aria-label={t('labels:watchVideo')}
                  color="primary"
                  onClick={toggle}
                >
                  <PlayArrowIcon />
                </Fab>
              </Box>
            </Paper>
          )}
        </ContentMediaModal>
      </Box>
    </HeaderTagline>
  );
};

HeaderTaglineWithFeaturedVideo.propTypes = {
  youtube: PropTypes.string.isRequired,
  youtubeTitle: PropTypes.string.isRequired,
};

export default HeaderTaglineWithFeaturedVideo;
