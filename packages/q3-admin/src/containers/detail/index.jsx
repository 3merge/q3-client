import React from 'react';
import PropTypes from 'prop-types';
import { map, pick, invoke } from 'lodash';
import { Box, Grid } from '@material-ui/core';
import DetailMeta from '../DetailMeta';
import DetailActions from '../DetailActions';
import DetailViews from '../DetailViews';
import DetailNavigation from '../DetailNavigation';
import DetailAppbar from '../DetailAppbar';
import DetailAlerts from '../DetailAlerts';
import DetailOptions from '../DetailOptions';
import Article from '../../components/Article';
import Widget from '../../components/Widget';
import withDetailViews from '../../helpers/withDetailViews';
import withPageLoading from '../../helpers/withPageLoading';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import useStyle from './styles';

const Detail = (props) => {
  const {
    HeaderProps,
    SummaryComponent,
    children,
    views,
    ...rest
  } = props;

  const cls = useStyle();

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
      />
    ),
    [HeaderProps, Actions],
  );

  const Alerts = React.useMemo(
    () => (
      <DetailAlerts registerAlerts={rest.registerAlerts} />
    ),
    [rest.registerAlerts],
  );

  return React.useMemo(
    () => (
      <Article>
        <Box height="auto" minHeight="100%">
          {AppBar}
          {invoke(rest, 'renderUi', props) || (
            <>
              {Alerts}
              <Grid
                className={cls.grid}
                container
                spacing={1}
              >
                <Grid item>
                  <Widget timeout={500} title="overview">
                    <DetailFeaturedPhoto />
                    {invoke(rest, 'renderSummaryComponent')}
                    {Summary}
                  </Widget>
                </Grid>
                <Grid item xs className={cls.details}>
                  <Widget timeout={750} title="details">
                    {Navigation}
                    {Views}
                  </Widget>
                </Grid>
              </Grid>
              <Box py={1.5}>
                <DetailMeta />
              </Box>
            </>
          )}
        </Box>
      </Article>
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
