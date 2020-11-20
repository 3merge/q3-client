import React from 'react';
import {
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { useHeader } from 'q3-hooked';
import * as Back from '../../Back';
import * as Photo from '../../Photo';

const Condensed = () => {
  const { title, description } = useHeader();

  return (
    <Container component="header" maxWidth="xl">
      <Grid alignItems="center" container spacing={2}>
        <Back.IconButton />
        <Photo.Avatar />
        <Grid item>
          <Typography
            component="h1"
            variant={description ? 'h4' : 'h3'}
          >
            {title}
          </Typography>
          {description && (
            <Typography component="p" gutterBottom={false}>
              {description}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Condensed;
