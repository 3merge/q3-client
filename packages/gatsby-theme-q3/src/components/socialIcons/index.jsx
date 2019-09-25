import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { SocialIcon } from 'react-social-icons';
import { useStyles } from '../footer';

const SocialLinks = ({ color, links }) => {
  const cls = useStyles();
  return (
    <Box p={2} className={cls[color]} align="center">
      {links.map((link) => (
        <SocialIcon
          url={link}
          key={link}
          target="_blank"
          style={{ margin: '0.25rem' }}
        />
      ))}
    </Box>
  );
};

SocialLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
  background: PropTypes.string.isRequired,
};

SocialLinks.defaultProps = {
  links: [],
};

export default SocialLinks;
