import React from 'react';
import { storiesOf } from '@storybook/react';
import { blueGrey } from '@material-ui/core/colors';
import imgSrc from '../../static/ready.png';
import Banner from '.';

storiesOf('Components|Banner', module)
  .add('Centered', () => (
    <Banner
      center
      title="Hey"
      subtitle="This is my subtitle"
      backgroundStyle={{
        backgroundColor: blueGrey[100],
      }}
    />
  ))
  .add('Custom right render', () => (
    <Banner
      label="overline"
      title="Hey, this banner can render custom components on all sizes!"
      subtitle="Just pass a node to `renderRight`, `renderLeft`, `renderTop` or `renderBottom`"
      backgroundStyle={{
        backgroundColor: '#fff',
      }}
      renderRight={() => (
        <img
          src={imgSrc}
          alt="Custom renderer"
          width="550"
        />
      )}
    />
  ));
