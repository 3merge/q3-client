import React from 'react';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { renderIf } from '../../helpers';

export const useStyles = makeStyles((theme) => ({
  primary: {
    backgroundColor: theme.palette.primary.dark,
    color: '#FFF',
  },
}));

const SocialLinks = ({ links }) => (
  <Box align="center">
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

SocialLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
};

SocialLinks.defaultProps = {
  links: [],
};

const Footer = ({ dense, children, socialLinks }) => {
  const { primary } = useStyles();
  return (
    <Box py={dense ? 2 : 8} className={primary} component="footer">
      <Container>
        <Grid container justify="space-between">
          {children}
        </Grid>
      </Container>
      {renderIf(socialLinks, <SocialLinks links={socialLinks} />)}
      <Box mt={2} mb={1} textAlign="center">
        <small>&copy; {new Date().getFullYear()}</small>
      </Box>
    </Box>
  );
};

Footer.defaultProps = {};

export default Footer;
