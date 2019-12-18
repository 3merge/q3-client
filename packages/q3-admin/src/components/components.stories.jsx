import React from 'react';
import axios from 'axios';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-ui-test-utils/lib/rest';
import Loader from './loader';
import FeaturedImage from './featuredImage';
import Public from './public';

const img =
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=8';

const logo =
  'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png';

const mockup = (m) => {
  m.onGet('/foo').reply(200);
};

storiesOf('Admin|Components', module)
  .add('Featured image', () => (
    <FeaturedImage url={img}>Hey there</FeaturedImage>
  ))
  .add('Loader', () => (
    <MockApi delay={5000} define={mockup}>
      <Loader />
      <button
        type="button"
        onClick={() => axios.get('/foo').then((r) => null)}
      >
        Load
      </button>
    </MockApi>
  ))
  .add('Public', () => (
    <Public
      logo={logo}
      company="Placeholder"
      title="Public view"
      isLoggedIn={false}
      url={img}
    >
      Hey there
    </Public>
  ));
