import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Main from '.';

export default {
  title: 'Q3 Admin|Components/Main',
  parameters: {
    component: Main,
    componentSubtitle: "Q3's standard application layout",
  },
};

export const Default = () => (
  <Main
    render={() => (
      <Container>
        <Typography variant="h2">
          This is the main area
        </Typography>
        <Typography variant="body2">
          Do with it what you will...
        </Typography>
      </Container>
    )}
    renderAside={() => null}
  />
);
