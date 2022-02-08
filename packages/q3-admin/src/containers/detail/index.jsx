import React from 'react';
import PropTypes from 'prop-types';
import { map, pick } from 'lodash';
import {
  Box,
  Grid,
  Hidden,
  Divider,
} from '@material-ui/core';
import DetailMeta from '../DetailMeta';
import DetailActions from '../DetailActions';
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
  views,
  ...rest
}) => {
  const viewDeps = [
    JSON.stringify(
      map(views, (v) => pick(v, ['label', 'to'])),
    ),
  ];

  const Actions = React.useMemo(
    () => <DetailActions {...rest} />,
    [rest.audit, rest.registerActions],
  );

  const Navigation = React.useMemo(
    () => <DetailNavigation views={views} />,
    viewDeps,
  );

  const Views = React.useMemo(
    () => <DetailViews {...rest} views={views} />,
    viewDeps.concat(rest.disablePaper),
  );

  const Summary = React.useMemo(
    () => <DetailOptions {...rest} />,
    [rest.registerOptions],
  );

  const AppBar = React.useMemo(
    () => (
      <DetailAppbar
        actions={Actions}
        summary={Summary}
        {...HeaderProps}
        {...rest}
      >
        {Navigation}
      </DetailAppbar>
    ),
    [HeaderProps, Actions, Summary, Navigation],
  );

  return React.useMemo(
    () => (
      <Box bgcolor="background.paper" height="100%">
        <Article>
          {AppBar}
          <Box m={2}>
            <Grid item xs>
              {Views}
              <Hidden lgUp>
                <Box my={2} px={1}>
                  <Divider />
                </Box>
                <Box maxWidth="100%" width={450} px={2}>
                  <DetailMeta />
                </Box>
              </Hidden>
            </Grid>
          </Box>
        </Article>
      </Box>
    ),
    [AppBar, Views],
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
  views: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

Detail.defaultProps = {
  children: null,
};

export default withPageLoading(
  withDetailViews(React.memo(Detail)),
);
