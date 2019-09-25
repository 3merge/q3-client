import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import docs from './README.md';
import { NewsCard, ProjectCard, ResourceCard } from '.';

const sharedProps = {
  imgSrc:
    'https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg',
  name: 'Foobar',
  title: 'Article title sits below',
  description:
    'Cards can have descriptions for context that only span a few lines',
  label: 'Topic',
  to: '/',
  buttonText: 'Read more',
};

const CardContainer = ({ children }) => (
  <Container style={{ marginTop: '1rem' }}>
    <Grid container spacing={5} justify="center">
      {children}
    </Grid>
  </Container>
);

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

storiesOf('Components|Cards', module)
  .addParameters({
    jest: ['card'],
    readme: {
      sidebar: docs,
    },
  })
  .add('News', () => (
    <CardContainer>
      <NewsCard {...sharedProps} />
    </CardContainer>
  ))
  .add('Project', () => (
    <CardContainer>
      <ProjectCard {...sharedProps} />
    </CardContainer>
  ))
  .add('Resource', () => (
    <CardContainer>
      <ResourceCard
        {...sharedProps}
        imgSrc="http://www.hixle.co/wp-content/uploads/Gatsby-JS-min.jpg"
      />
    </CardContainer>
  ));
