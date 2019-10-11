import React from 'react';
import { storiesOf } from '@storybook/react';
import Section from '.';

storiesOf('Components|Section', module).add('Split', () => (
  <Section
    title="This is a title for a section component"
    subtitle="And here, we can add subtext for more information"
  >
    Children!
  </Section>
));
