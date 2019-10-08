import React from 'react';
import { get } from 'lodash';
import { Link, graphql } from 'gatsby';
import { Components } from 'q3-ui';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { deepPurple } from '@material-ui/core/colors';

const IndexPage = ({ data: { contentfulIndex } }) => {
  const bannerProps = {
    title: get(contentfulIndex, 'hero.title'),
    subtitle: get(
      contentfulIndex,
      'hero.subtitle.subtitle',
    ),
    label: get(contentfulIndex, 'hero.label'),
  };

  return (
    <>
      <Components.FeaturedPhotoBanner
        {...bannerProps}
        imgSrc={get(contentfulIndex, 'hero.image.file.url')}
        style={{
          backgroundColor: deepPurple[100],
        }}
      />
      <Components.Divider
        invert
        variant="wave4"
        gutterBottom
        fill={deepPurple[100]}
      />
      <Components.Section
        title={get(contentfulIndex, 'aboutHeader.title')}
        subtitle={get(
          contentfulIndex,
          'aboutHeader.subtitle.subtitle',
        )}
      >
        <Grid container justify="space-around">
          {get(contentfulIndex, 'about', []).map((obj) => (
            <Components.Feature
              body={get(obj, 'description.description')}
              imgSrc={get(obj, 'image.file.url')}
              key={obj.contentful_id}
              title={obj.title}
            />
          ))}
        </Grid>
      </Components.Section>

      <Components.Wrapper>
        <Components.TwoColumnPanel
          title={get(
            contentfulIndex,
            'serviceHeader.label',
          )}
          subtitle={get(
            contentfulIndex,
            'serviceHeader.title',
          )}
          body={
            <>
              {get(
                contentfulIndex,
                'serviceHeader.subtitle.subtitle',
              )}
              <Button
                size="large"
                variant="contained"
                color="primary"
              >
                Talk to sales
              </Button>
            </>
          }
        />
      </Components.Wrapper>

      <Container
        maxWidth="lg"
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Grid container spacing={10}>
          <Components.ProjectCard
            label="OMG"
            name="Gentek"
            title="Centralized API for clients, orders and resellers"
            description="We've created an extensible Express JS starter service for RESTful APIs"
            imgSrc="https://images.unsplash.com/photo-1569267528346-723440a07cd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            to="/contact"
          />
        </Grid>
      </Container>

      <Components.Section
        title="In the community"
        subtitle="We're active in the space, blogging and producing open-source packages. Checkout some of our insights or projects"
      >
        <Grid container spacing={2}>
          <Components.NewsCard
            label="Component Library"
            name="Q3 Client"
            title="Material UI Gatsby and React App implementations"
            description="We've created a component library for rapidly prototyping and deploying professional services"
            imgSrc="https://images.unsplash.com/photo-1569261152203-3b9ff82caaaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            to="/contact"
          />
          <Components.NewsCard
            label="Starter"
            name="Q3 API"
            title="Express and Mongoose starter"
            description="We've created an extensible Express JS starter service for RESTful APIs"
            imgSrc="https://images.unsplash.com/photo-1569267528346-723440a07cd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            to="/contact"
          />
          <Components.NewsCard
            label="Starter"
            name="Q3 API"
            title="Express and Mongoose starter"
            description="We've created an extensible Express JS starter service for RESTful APIs"
            imgSrc="https://images.unsplash.com/photo-1558478856-a4a566c8aa6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80"
            to="/contact"
          />
        </Grid>
      </Components.Section>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    contentfulIndex {
      serviceHeader {
        title
        label
        subtitle {
          subtitle
        }
      }
      services {
        name
        description {
          description
        }
        cases {
          client
          logo {
            file {
              url
            }
          }
        }
      }
      aboutHeader {
        title
        label
        subtitle {
          subtitle
        }
      }
      about {
        contentful_id
        title
        description {
          description
        }
        image {
          title
          file {
            url
          }
        }
      }
    }
  }
`;
