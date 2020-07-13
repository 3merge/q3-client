import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { WithForm } from './HeaderWithForm/HeaderWithForm.stories';
import { WithContentSection } from './FeatureListWithIcons/FeatureListWithIcons.stories';

export default {
  title: 'Q3 Blocks|Layouts/Signup',
  decorators: [withA11y],
};

export const SignupLayoutDemo = () => (
  <>
    <WithForm />
    <WithContentSection />
  </>
);
