import React from 'react';
import PropTypes from 'prop-types';
import SkeletonHeader from './skeletonHeader';
import SkeletonSection from './skeletonSection';
import SkeletonSidebar from './skeletonSidebar';
import SkeletonTable from './skeletonTable';
import Section from '../section';

const Loading = ({ id }) => (
  <Section
    renderInside={
      <>
        <SkeletonHeader />
        {id ? <SkeletonSection /> : <SkeletonTable />}
      </>
    }
    renderOutside={<SkeletonSidebar />}
    overflowY="hidden"
  />
);

Loading.propTypes = {
  id: PropTypes.string,
};

Loading.defaultProps = {
  id: null,
};

export default Loading;
