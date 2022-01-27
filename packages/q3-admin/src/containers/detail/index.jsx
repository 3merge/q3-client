import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid } from '@material-ui/core';
import Article from '../../components/Article';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import { mapToNestedRoute } from './helpers';
import DetailViews from '../DetailViews';
import DetailNavigation from '../DetailNavigation';
import { useAppContext } from '../../hooks';
import { Store } from '../state';
import DetailAppbar from '../DetailAppbar';
import DetailOptions from '../DetailOptions';
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
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),

  /**
   * Will auto-append featured image.
   */
  picture: PropTypes.bool,
};

Detail.defaultProps = {
  picture: false,
  children: null,
};

const withDynamicViews =
  (Component) =>
  ({ children, ...props }) => {
    const { check } = useAppContext();
    const { data } = React.useContext(Store);

    const views = mapToNestedRoute(children).filter((el) =>
      check(el.label, el, data),
    );

    return React.useMemo(
      () =>
        views.findIndex((view) => view.to === '/') ===
        -1 ? (
          <ViewNotAllowed />
        ) : (
          <Component views={views} {...props} />
        ),
      [JSON.stringify(views)],
    );
  };

export default withDynamicViews(Detail);
