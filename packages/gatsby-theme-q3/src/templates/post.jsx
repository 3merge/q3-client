import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { Banner } from 'q3-ui';

const Post = ({ children }) => (
  <Box component="mail">
    <Banner
      title={() => (
        <Box
          pt={3}
          pr={3}
          style={{
            background: '#FFF',
            position: 'relative',
          }}
        >
          "A full-span hero with custom renders"
        </Box>
      )}
      subtitle="A case study on process managmenet"
      dense
      renderTop={() => (
        <Box
          mt={-2}
          mb={-10}
          ml={10}
          style={{
            position: 'relative',
            height: 450,
            width: '100%',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
            alt="Placeholder"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      )}
    />
    <Container maxWidth="lg" section="article">
      <Container
        maxWidth="md"
        style={{ margin: '0 0 0 auto' }}
      >
        {children}
      </Container>
    </Container>
  </Box>
);

Post.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Post;
