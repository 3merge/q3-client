import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useStyle from './useStyle';

const ContentHalvesColumn = ({ children }) => (
  <Grid item md={6} xs={12}>
    {children}
  </Grid>
);

ContentHalvesColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

const ContentHalves = ({
  children,
  title,
  imageProps,
  label,
  flip,
  action,
}) => {
  const cls = useStyle({ flip });

  return (
    <Container maxWidth="lg" component="section">
      <Grid container spacing={3} className={cls.root}>
        <ContentHalvesColumn>
          <Image {...imageProps} className={cls.image} />
        </ContentHalvesColumn>
        <ContentHalvesColumn>
          {label && (
            <Typography variant="overline" component="span">
              {label}
            </Typography>
          )}
          <Typography
            variant="h3"
            component="h2"
            color="secondary"
          >
            {title}
          </Typography>
          <Divider className={cls.divider} />
          <Typography className={cls.description}>
            {children}
          </Typography>
          {action && <Box mt={1}>{action}</Box>}
        </ContentHalvesColumn>
      </Grid>
    </Container>
  );
};

ContentHalves.defaultProps = {
  flip: false,
  label: '',
};

ContentHalves.propTypes = {
  /**
   * The body text for this component.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,

  /**
   * The content for this component's H3 element.
   */
  title: PropTypes.string.isRequired,

  /**
   * The content for this component's label element.
   */
  label: PropTypes.string,

  /**
   * Forward directly into GatsbyImage.
   */
  imageProps: PropTypes.shape({
    alt: PropTypes.string,
    fluid: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,

  /**
   * Reverse the direction of the internal grid.
   */
  flip: PropTypes.bool,
};

export default ContentHalves;
