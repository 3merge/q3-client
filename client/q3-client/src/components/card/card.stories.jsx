import React from 'react';
import faker from 'faker';
import { storiesOf } from '@storybook/react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import docs from './README.md';
import Card from '.';
import Missing from '../../static/empty.png';
import Upload from '../../static/upload.png';
import Err from '../../static/error.png';

storiesOf('Components|Cards', module)
  .addParameters({
    jest: ['card'],
    readme: {
      sidebar: docs,
    },
  })
  .add('In a grid', () => (
    <Container style={{ marginTop: '1rem' }}>
      <Grid container spacing={5}>
        <Grid item md={4} xs={6}>
          <Card
            to="/one"
            Icon={Missing}
            title={faker.lorem.words()}
            description={faker.lorem.sentences()}
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <Card
            to="/two"
            Icon={Upload}
            title={faker.lorem.words()}
            description={faker.lorem.sentences()}
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <Card
            to="/three"
            Icon={Err}
            title={faker.lorem.words()}
            description={faker.lorem.words(25)}
          />
        </Grid>
      </Grid>
    </Container>
  ));
