import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import Breadcrumbs from '../../components/Breadcrumbs';
import DetailFeaturedPhoto from '../DetailFeaturedPhoto';
import DetailHeader from '../DetailHeader';
import DetailMeta from '../DetailMeta';
import ActionBar from '../../components/ActionBar';
import useStyle from './styles';

const DetailAppbar = ({
  children,
  actions,
  summary,
  ...rest
}) => {
  const cls = useStyle();

  return (
    <Container maxWidth="xl" component="header">
      <DetailFeaturedPhoto />
      <DetailHeader {...rest}>{actions}</DetailHeader>
      {summary}
    </Container>
  );
};

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
