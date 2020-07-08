import React from 'react';
import PropTypes from 'prop-types';
import SkeletonHeader from './skeletonHeader';
import SkeletonSection from './skeletonSection';
import SkeletonSidebar from './skeletonSidebar';
import SkeletonTable from './skeletonTable';
import Article from '../Article';

const Loading = ({ id }) => (
  <Article asideComponent={<SkeletonSidebar />}>
    <>
      <SkeletonHeader />
      {id ? <SkeletonSection /> : <SkeletonTable />}
    </>
  </Article>
);

Loading.propTypes = {
  id: PropTypes.string,
};

Loading.defaultProps = {
  id: null,
};

export default Loading;
