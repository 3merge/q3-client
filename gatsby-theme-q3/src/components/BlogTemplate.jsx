import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { navigate } from '@reach/router';
import moment from 'moment';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TodayIcon from '@material-ui/icons/Today';
import Breadcrumbs from 'q3-ui/lib/breadcrumbs';
import Wrapper from 'q3-ui/lib/wrapper';
import Pagination from 'q3-ui/lib/pagination';
import RichText from './RichText';
import SocialShare from './ShareButton';
import SearchEngine from './SearchEngine';

const BlogTemplateSharePublication = ({ publishedOn }) => (
  <Grid container spacing={1}>
    {publishedOn && (
      <Grid item>
        <TodayIcon /> {moment.format('LL')}
      </Grid>
    )}
    <Grid item>
      <Grid container>
        <SocialShare platform="Facebook" />
        <SocialShare platform="Twitter" />
        <SocialShare platform="LinkedIn" />
        <SocialShare platform="Email" />
      </Grid>
    </Grid>
  </Grid>
);

BlogTemplateSharePublication.propTypes = {
  publishedOn: PropTypes.string,
};

BlogTemplateSharePublication.defaultProps = {
  publishedOn: null,
};

const BlogTemplate = ({ current, prev, next }) => (
  <Box my={2}>
    <SearchEngine
      title={current.title}
      description={get(current, 'description.description')}
    />
    <Wrapper backgroundColor="#FFF">
      <Container component="article" maxWidth="md">
        <Breadcrumbs root="/" mode="light" />
        <Typography variant="h1" gutterBottom>
          {current.title}
        </Typography>
        {current.subtitle && (
          <Box mb={3}>
            <Typography variant="body2" gutterBottom>
              {current.subtitle}
            </Typography>
          </Box>
        )}
        <BlogTemplateSharePublication
          publishedOn={current.publishedOn}
        />

        {current.image && (
          <Box my={3}>
            <Image
              style={{ maxWidth: '100%' }}
              fixed={current.image.fixed}
              alt={current.image.title}
            />
          </Box>
        )}
        <RichText json={get(current, 'body.json')} />
        <Pagination
          nextDescription={get(next, 'title')}
          prevDescription={get(prev, 'title')}
          onNext={() => navigate(next.to)}
          onPrev={() => navigate(prev.to)}
        />
      </Container>
    </Wrapper>
  </Box>
);

BlogTemplate.propTypes = {
  current: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    publishedOn: PropTypes.string,
    image: PropTypes.object,
  }).isRequired,
  next: PropTypes.shape({
    to: PropTypes.string,
  }).isRequired,
  prev: PropTypes.shape({
    to: PropTypes.string,
  }).isRequired,
};

export default BlogTemplate;
