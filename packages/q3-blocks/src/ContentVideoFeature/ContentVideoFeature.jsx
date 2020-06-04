import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GatsbyImage from 'gatsby-image';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { url } from 'q3-ui-helpers';
import Fab from '@material-ui/core/Fab';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Tooltip from 'q3-ui/lib/tooltip';
import { useTranslation } from 'react-i18next';
import ContentMediaModal from '../ContentMediaModal';
import ButtonSecondary from '../ButtonSecondary';

const ContentVideoFeature = ({ youtube }) => {
  const { thumbnail, embed } = url.getYoutube(youtube);
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl" disableGutters>
      <Box position="relative" py={4}>
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
        >
          <GatsbyImage
            style={{ height: '100%', width: '100%' }}
            fluid={{ src: thumbnail }}
          />
          <Box
            style={{
              backgroundColor: '#000',
              opacity: 0.66,
            }}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
          />
        </Box>
        <Container maxWidth="md">
          <Box position="relative">
            <Grid container alignItems="center">
              <Grid
                item
                style={{ width: 375, maxWidth: '100%' }}
              >
                <Paper
                  elevation={2}
                  style={{
                    backgroundColor: 'rgba(255,255,255,1)',
                  }}
                >
                  <Box p={2}>
                    <Typography
                      style={{
                        borderRadius: 3,
                        fontWeight: 'bold',
                        backgroundColor: '#f5f7f9',
                        fontSize: '0.833rem',
                        textTransform: 'uppercase',
                        padding: 6,
                        display: 'inline-block',
                        margin: 0,
                      }}
                      color="secondary"
                      component="span"
                    >
                      Hey hey hey
                    </Typography>
                    <Box my={1}>
                      <Typography
                        component="h3"
                        variant="h5"
                        gutterBottom
                      >
                        About Century Welding
                      </Typography>
                      <Typography>
                        We are an online Canadian outlet for
                        premier welding, cutting, battery
                        charging equipment, related
                        accessories and replacement parts.
                        We offer exceptional value to the
                        professional and the home user.
                      </Typography>
                    </Box>
                    <ButtonSecondary>
                      Learn more
                    </ButtonSecondary>
                  </Box>
                </Paper>
              </Grid>
              <Grid item zeroMinWidth xs align="center">
                <ContentMediaModal
                  media={
                    <iframe
                      src={embed}
                      style={{ height: 450 }}
                      frameBorder="0"
                      allowFullScreen
                    />
                  }
                >
                  {(trigger) => (
                    <Tooltip
                      title={t('labels:watch')}
                      arrow
                    >
                      <Fab
                        color="primary"
                        onClick={trigger}
                        size="lg"
                      >
                        <VideoLibrary />
                      </Fab>
                    </Tooltip>
                  )}
                </ContentMediaModal>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default ContentVideoFeature;
