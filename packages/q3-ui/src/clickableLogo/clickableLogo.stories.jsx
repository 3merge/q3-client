import React from 'react';
import Grid from '@material-ui/core/Grid';
import ClickableLogo, { LogoGalleryContainer } from '.';

export default {
  title: 'Q3 UI|Components/ClickableLogo',
};

export const InGallery = () => (
  <LogoGalleryContainer>
    <ClickableLogo
      name="Foo"
      to="/"
      logo="https://logoipsum.com/assets/logo/logo-2.svg"
    />
    <ClickableLogo
      name="Bar"
      to="/"
      logo="https://logoipsum.com/assets/logo/logo-4.svg"
    />
    <ClickableLogo
      name="Quux"
      to="/"
      logo="https://logoipsum.com/assets/logo/logo-12.svg"
    />
  </LogoGalleryContainer>
);
