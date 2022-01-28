import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid } from '@material-ui/core';
import DetailViews from '../DetailViews';
import DetailNavigation from '../DetailNavigation';
import DetailAppbar from '../DetailAppbar';
import DetailOptions from '../DetailOptions';
import Article from '../../components/Article';
import withDetailViews from '../../helpers/withDetailViews';
import withPageLoading from '../../helpers/withPageLoading';
import useStyle from './styles';

const Detail = ({
  HeaderProps,
  children,
  picture,
  views,
  ...rest
}) => {
  const cls = useStyle();
  const Summary = React.useMemo(
    () => <DetailOptions {...rest} />,
    [],
  );

  return (
    <Article>
      <DetailAppbar
        summary={Summary}
        {...HeaderProps}
        {...rest}
      >
        <DetailNavigation views={views} />
      </DetailAppbar>
      <Box my={2}>
        <Container maxWidth="xl">
          <Grid className={cls.grid} container spacing={1}>
            <Grid item className={cls.aside}>
              {Summary}
            </Grid>
            <Grid item xs>
              <DetailViews views={views} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Article>
  );
};

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
