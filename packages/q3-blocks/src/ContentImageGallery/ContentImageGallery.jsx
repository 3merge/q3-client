import React from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Swiper from 'react-id-swiper';
import Image from 'gatsby-image';
import { array } from 'q3-ui-helpers';
import useStyle from './useStyle';
import ContentMediaModal from '../ContentMediaModal';

export const getMinimum = (a, num) =>
  Math.min(a.length, num);

export const pair = (a = []) =>
  a.reduce((curr, next, i) => {
    if ((i + 1) % 2 === 0 && a.length > 4) {
      curr[curr.length - 1].push(next);
    } else {
      curr.push([next]);
    }

    return curr;
  }, []);

const ContentImageGallery = ({ images }) => {
  const cls = useStyle();

  if (!array.hasLength(images)) return null;

  const arr = pair(images);

  const params = {
    slidesPerView: 1,
    spaceBetween: 15,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: getMinimum(arr, 4),
      },
      768: {
        slidesPerView: getMinimum(arr, 3),
      },
      640: {
        slidesPerView: getMinimum(arr, 2),
      },
      320: {
        slidesPerView: 1,
      },
    },
  };

  return (
    <Container maxWidth="xl" className={cls.root}>
      <Grid
        container
        spacing={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={3} xs={12}>
          <Box textAlign="center">
            <Typography variant="overline" component="span">
              hy
            </Typography>
            <Typography variant="subtitle2" component="h3">
              This is the title for this section that we
              only allow so many characters for...
            </Typography>
          </Box>
        </Grid>
        <Grid item md={9} xs={12}>
          <Swiper {...params}>
            {arr.map((pairOf, key) => (
              <div key={key}>
                {pairOf.map((image, i) => (
                  <ContentMediaModal
                    media={
                      <Image
                        style={{
                          height: 550,
                          width: '100%',
                        }}
                        {...image}
                      />
                    }
                  >
                    {(onClick) => (
                      <Paper
                        style={{
                          marginBottom:
                            i === 0
                              ? params.spaceBetween
                              : 0,
                        }}
                        elevation={5}
                        role="button"
                        tabIndex={0}
                        onKeyPress={onClick}
                        onClick={onClick}
                        className={cls.trigger}
                      >
                        <Image
                          style={{
                            height: 250,
                            width: '100%',
                          }}
                          {...image}
                        />
                      </Paper>
                    )}
                  </ContentMediaModal>
                ))}
              </div>
            ))}
          </Swiper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContentImageGallery;
