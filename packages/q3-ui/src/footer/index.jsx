import React from 'react';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  primary: {
    backgroundColor: ({ backgroundColor }) =>
      backgroundColor || theme.palette.primary.dark,
    color: '#FFF',
  },
  copy: {
    marginRight: theme.spacing(1),
  },
}));

export const SocialLinks = ({ links, size }) => (
  <Box align="center">
    {links.map((link) => (
      <SocialIcon
        url={link}
        key={link}
        rel="noreferrer noopener"
        target="_blank"
        style={{
          margin: '0.25rem',
          height: size,
          width: size,
        }}
      />
    ))}
  </Box>
);

SocialLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.number,
};

SocialLinks.defaultProps = {
  links: [],
  size: 42,
};

export const Copyright = ({ text }) => {
  const { copy } = useStyles();
  return (
    <small>
      <span className={copy}>
        &copy; {new Date().getFullYear()}
      </span>
      {text}
    </small>
  );
};

const Footer = ({
  dense,
  render,
  renderBottom,
  bottom,
  backgroundColor,
}) => {
  const invoke = (fn) => (fn ? fn() : null);
  const { primary } = useStyles({
    backgroundColor,
  });
  return (
    <Box className={primary} component="footer">
      <Container>
        <Box py={dense ? 2 : 4}>
          <Grid container justify="space-between">
            {invoke(render)}
          </Grid>
        </Box>
      </Container>
      {invoke(renderBottom)}
    </Box>
  );
};

Footer.defaultProps = {};

export default Footer;
