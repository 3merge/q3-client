import React from 'react';
import PropTypes from 'prop-types';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import DetailHeader from '../DetailHeader';
import ActionBar from '../../components/ActionBar';
import Header from '../../components/Header';

const DetailAppbar = ({
  children,
  actions,
  summary,
  ...rest
}) => (
  <Header>
    <div>
      <DetailFeaturedPhoto />
      <DetailHeader {...rest}>
        <ActionBar>{actions}</ActionBar>
      </DetailHeader>
      {summary}
    </div>
  </Header>
);

DetailAppbar.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
  summary: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
};

DetailAppbar.defaultProps = {
  actions: null,
  children: null,
  summary: null,
};

export default React.memo(DetailAppbar);
