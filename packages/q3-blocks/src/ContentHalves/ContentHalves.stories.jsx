import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import Typography from '@material-ui/core/Typography';
import ContentHalves from './ContentHalves';
import img from '../__fixtures__/gatsby-image';
import ButtonPrimary from '../ButtonPrimary';

export default {
  title: 'Q3 Blocks|Contents/Halves',
  decorators: [withA11y, withKnobs],
};

export const withPicture = () => {
  const flip = boolean('Swap sides', false);
  return (
    <ContentHalves
      flip={flip}
      title="Sample title"
      imageProps={img}
      action={
        <>
          <ButtonPrimary>HI</ButtonPrimary>
        </>
      }
    >
      <Typography>
        I am a paragraph within the component.
      </Typography>
      <ul>
        <Typography component="li">
          And I am a list item
        </Typography>
      </ul>
    </ContentHalves>
  );
};

export const withVideo = () => {
  return (
    <ContentHalves
      videoUrl="https://youtu.be/YE7VzlLtp-4"
      title="Sample title"
      imageProps={img}
      action={
        <>
          <ButtonPrimary>HI</ButtonPrimary>
        </>
      }
    >
      <Typography>
        I am a paragraph within the component.
      </Typography>
      <ul>
        <Typography component="li">
          And I am a list item
        </Typography>
      </ul>
    </ContentHalves>
  );
};
