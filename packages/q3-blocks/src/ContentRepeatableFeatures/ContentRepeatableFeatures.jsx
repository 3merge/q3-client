import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import ContentSection from '../ContentSection';
import ContentSectionHeader from '../ContentSectionHeader';

const ContentSectionHeaderWithRepeaterFeatures = ({
  features,
  featureComponent: Feature,
  featureGridProps,
  disableDividers,
  align,
  justify,
  ...rest
}) => (
  <ContentSection {...rest}>
    <ContentSectionHeader {...rest} />
    <Box mt={4}>
      <Grid
        container
        spacing={2}
        justify={justify}
        alignItems={align}
      >
        {features.map((el, i) => (
          <React.Fragment key={el.title}>
            <Grid item {...featureGridProps}>
              <Feature {...el} />
            </Grid>
            {!disableDividers && i !== features.length - 1 && (
              <Hidden smDown>
                <Divider orientation="vertical" flexItem />
              </Hidden>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  </ContentSection>
);

ContentSectionHeaderWithRepeaterFeatures.defaultProps = {
  disableDividers: true,
  featureGridProps: {
    xs: 12,
  },
  align: 'center',
  justify: 'flex-start',
};

ContentSectionHeaderWithRepeaterFeatures.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
  featureGridProps: PropTypes.shape({
    xs: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }),
  featureComponent: PropTypes.node.isRequired,
  disableDividers: PropTypes.bool,
  align: PropTypes.string,
  justify: PropTypes.string,
};

export default ContentSectionHeaderWithRepeaterFeatures;
