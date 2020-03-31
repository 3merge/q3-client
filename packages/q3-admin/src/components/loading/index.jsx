import React from 'react';
import PropTypes from 'prop-types';
import { TableSkeleton } from 'q3-ui-datatables';
import { ListContainer } from '../../containers/table';
import SkeletonHeader from './skeletonHeader';
import SkeletonSection from './skeletonSection';
import SkeletonSidebar from './skeletonSidebar';
import Section from '../section';

const Loading = ({ id }) =>
  id ? (
    <>
      <SkeletonHeader />
      <Section
        renderInside={<SkeletonSection />}
        renderOutside={<SkeletonSidebar />}
        overflowY="hidden"
      />
    </>
  ) : (
    <>
      <SkeletonHeader />
      <ListContainer overflowY="hidden">
        <TableSkeleton />
      </ListContainer>
    </>
  );

Loading.propTypes = {
  id: PropTypes.string,
};

Loading.defaultProps = {
  id: null,
};

export default Loading;
