import React from 'react';
import { storiesOf } from '@storybook/react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import docs from './README.md';
import { NewsCard, ProjectCard, ResourceCard } from '.';

storiesOf('Components|Cards', module)
  .addParameters({
    jest: ['card'],
    readme: {
      sidebar: docs,
    },
  })
  .add('News', () => (
    <Container style={{ marginTop: '1rem' }}>
      <Grid container spacing={5} justify="center">
        <Grid item md={4} xs={6}>
          <NewsCard
            to="/one"
            imgSrc="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
            title="Let's not go crazy with title lenghts"
            description="So this is a description. Nice, eh?"
          />
        </Grid>
      </Grid>
    </Container>
  ))
  .add('Project', () => (
    <Grid container justify="center">
      <Grid
        item
        md={3}
        xs={6}
        style={{ marginTop: '2rem' }}
      >
        <ProjectCard
          label="October 2019"
          imgSrc="http://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Polymer_Project_logo.png/240px-Polymer_Project_logo.png"
          title="70% time reductions doing this"
          name="Polymer"
          description="So this is a description. Nice, eh?"
        />
      </Grid>
    </Grid>
  ))
  .add('Resource', () => (
    <Grid container justify="center">
      <ResourceCard
        title="Po"
        imgSrc="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
      />
    </Grid>
  ));
