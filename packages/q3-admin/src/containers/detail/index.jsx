import React from 'react';
import PropTypes from 'prop-types';
import { map, pick, invoke, isFunction } from 'lodash';
import { Box, Grid } from '@material-ui/core';
import DetailMeta from '../DetailMeta';
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
import DetailSummary from '../DetailSummary';

import PageHeaderMap from '../../components/PageHeaderMap';

const Detail = (props) => {
  const {
    HeaderProps,
    SummaryComponent,
    children,
    renderContent,
    views,
    ...rest
  } = props;

  const viewDeps = [
    JSON.stringify(
      map(views, (v) => pick(v, ['label', 'to'])),
    ),
  ];

  const Alerts = React.useMemo(
    () => (
      <DetailAlerts registerAlerts={rest.registerAlerts} />
    ),
    [rest.registerAlerts],
  );

  const AppBar = React.useMemo(
    () => <DetailAppbar {...HeaderProps} {...rest} />,
    [HeaderProps, rest.audit, rest.registerActions],
  );

  const Navigation = React.useMemo(
    () => <DetailNavigation views={views} />,
    viewDeps,
  );
  const Meta = <DetailMeta />;

  const Summary = React.useMemo(
    () => (
      <DetailSummary {...rest}>
        <DetailFeaturedPhoto />
        {invoke(rest, 'renderSummaryComponent')}
        <DetailOptions {...rest} />
        {Meta}
      </DetailSummary>
    ),
    [
      Meta,
      rest.registerOptions,
      rest.renderSummaryComponent,
    ],
  );

  const Views = React.useMemo(
    () => <DetailViews {...rest} views={views} />,
    viewDeps.concat(rest.disablePaper),
  );

  const Details = React.useMemo(
    () => (
      <Widget
        expandable={false}
        timeout={750}
        title="details"
      >
        {Navigation}
        {Views}
      </Widget>
    ),
    [Navigation, Views],
  );

  const Content = React.useMemo(
    () => (
      <>
        {Alerts}
        {Summary}
        {Details}
      </>
    ),
    [Details, Summary],
  );

  return React.useMemo(
    () => (
      <Article>
        <Box height="auto" minHeight="100%">
          {/* <PageHeaderMap
            address={{
              name: '3merge',
              streetNumber: 104,
              streetLine1: 'Crockford Blvd',
              streetLine2: 'Suite 211',
              city: 'Scarborough',
              region: 'ON',
              country: 'CA',
              postal: 'M1R 3C3',
            }}
          /> */}
          {AppBar}
          {isFunction(renderContent)
            ? renderContent(
                Content,
                {
                  Alerts,
                  AppBar,
                  Details,
                  Meta,
                  Navigation,
                  Summary,
                  Views,
                },
                props,
              )
            : Content}
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
  renderContent: PropTypes.func,
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
  renderContent: null,
};

export default withPageLoading(
  withDetailViews(React.memo(Detail)),
);
