import React from 'react';
import { get } from 'lodash';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { News as NewsCard } from 'q3-ui/lib/card';
import Wrapper from 'q3-ui/lib/wrapper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

const BlogArchiveTemplate = ({
  blogs,
  pageNum,
  total,
  dir,
}) => (
  <Wrapper backgroundColor="transparent">
    <Grid container spacing={1}>
      {blogs.map((blog) => (
        <NewsCard
          md={3}
          title={blog.title}
          description={get(blog, 'description.description')}
          imgSrc={get(blog, 'image.fixed.src')}
          to={blog.to}
        />
      ))}
    </Grid>
    <Box my={2}>
      {dir && (
        <Pagination
          defaultPage={pageNum + 1}
          count={total}
          onChange={(e, num) =>
            navigate(`/${dir}/${num > 1 ? num : ''}`)
          }
        />
      )}
    </Box>
  </Wrapper>
);

BlogArchiveTemplate.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.description,
    }),
  ).isRequired,
  pageNum: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  dir: PropTypes.string.isRequired,
};

export default BlogArchiveTemplate;
