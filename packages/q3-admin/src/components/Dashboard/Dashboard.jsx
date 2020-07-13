import React from 'react';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useStyle from '../useStyle';

const Dashboard = ({ children, title, version }) => {
  const cls = useStyle();

  return (
    <>
      <Hidden mdDown>
        <Box style={{ height: 65 }} />
      </Hidden>
      <Container
        maxWidth="xl"
        className={cls.fillViewportHeight}
      >
        <Box pb={4}>
          <Box component="header" mt={1} mb={3}>
            <Typography
              component="p"
              variant="overline"
              align="center"
            >
              v.{version}
            </Typography>
            <Typography
              align="center"
              variant="h2"
              component="h1"
              gutterBottom
            >
              {title}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {children}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
