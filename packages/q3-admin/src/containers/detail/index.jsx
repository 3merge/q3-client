import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import DetailViews from '../DetailViews';
import DetailNavigation from '../DetailNavigation';
import DetailAppbar from '../DetailAppbar';
import DetailOptions from '../DetailOptions';
import Article from '../../components/Article';
import withDetailViews from '../../helpers/withDetailViews';
import withPageLoading from '../../helpers/withPageLoading';

const Detail = ({
  HeaderProps,
  children,
  picture,
  views,
  ...rest
}) => (
  <Article>
    <DetailAppbar
      summary={<DetailOptions {...rest} />}
      {...HeaderProps}
      {...rest}
    >
      <DetailNavigation views={views} />
    </DetailAppbar>
    <Box m={2}>
      <Grid item xs>
        <DetailViews {...rest} views={views} />
      </Grid>
    </Box>
  </Article>
);

Detail.propTypes = {
  HeaderProps: PropTypes.shape({
    parenthesesProp: PropTypes.string,
    titleProp: PropTypes.string,
    titleRenderer: PropTypes.func,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  picture: PropTypes.bool,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

Detail.defaultProps = {
  picture: false,
  children: null,
};

export default withPageLoading(withDetailViews(Detail));
