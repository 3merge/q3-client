import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import Wrapper from '.';

storiesOf('Components/Wrapper', module)
  .add('With custom background color', () => (
    <Wrapper backgroundColor="#FFF" />
  ))
  .add('Negative margin', () => (
    <>
      <Box py={10} style={{ background: 'lightblue' }} />
      <Wrapper backgroundColor="#FFF" negativeMargin>
        HI
      </Wrapper>
    </>
  ))
  .add('Full-width', () => (
    <>
      <Wrapper backgroundColor="#FFF" fullWidth />
    </>
  ));
