import React from 'react';
import PropTypes from 'prop-types';
import { TableSkeleton } from 'q3-ui-datatables';
import SkeletonHeader from './skeletonHeader';
import SkeletonSection from './skeletonSection';
import SkeletonSidebar from './skeletonSidebar';
import Section from '../section';

const Loading = ({ id }) => (
  <Section
    renderInside={
      <>
        <SkeletonHeader />
        {id ? <SkeletonSection /> : <TableSkeleton />}
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
