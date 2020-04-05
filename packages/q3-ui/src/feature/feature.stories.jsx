import React from 'react';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Feature, {
  FeatureHorizontal,
  ClickableFeature,
} from '.';
import { withImage } from './__fixtures__';

export default {
  title: 'Q3 UI|Components/Feature',
  parameters: {
    component: Feature,
    componentSubtitle:
      'For highlighting independent parts of a whole',
  },
};

export const Example = () => (
  <Feature align="left" {...withImage} />
);

export const VerticalSmall = () => (
  <Feature
    columnSize={3}
    imgSrc="https://images.unsplash.com/photo-1556912102-ea493a2a5b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1628&q=80"
    imageSizeSmall
    title="This is a feature"
    body="Lem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, justo sed pellentesque pharetra, sem nibh feugiat ipsum, ac pellentesque mauris mi at dolor"
  />
);

export const Horizontal = () => (
  <FeatureHorizontal
    title="This is a feature"
    body="Lem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper, justo sed pellentesque pharetra, sem nibh feugiat ipsum, ac pellentesque mauris mi at dolor"
    icon={<AcUnitIcon fontSize="large" />}
  />
);

export const WithClick = () => (
  <ClickableFeature {...withImage} />
);
