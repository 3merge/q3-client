import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import { ReactSortable } from 'react-sortablejs';
import { map } from 'lodash';
import SegmentsContext from '../SegmentsContext';
import SegmentListItem from '../SegmentListItem';
import SegmentListItemLink from '../SegmentListItemLink';
import SegmentListItemAll from '../SegmentListItemAll';
import useStyle from './styles';

const SegmentList = ({
  label,
  isTopTier,
  segments,
  onEnd,
  ...rest
}) => {
  const { enabled } = React.useContext(SegmentsContext);
  const [state, setState] = React.useState(segments);
  const cls = useStyle({
    isTopTier,
  });

  React.useEffect(() => {
    setState(segments);
  }, [segments]);

  return (
    <List component="div" className={cls.root}>
      {isTopTier && (
        <SegmentListItemAll {...rest} segments={segments} />
      )}
      <ReactSortable
        tag="ul"
        disabled={!enabled}
        group={{
          name: label,
          pull: true,
          put: true,
        }}
        list={state}
        onEnd={onEnd}
        setList={setState}
      >
        {map(state, (segment) => {
          const { id: key } = segment;

          return segment.folder ? (
            <SegmentListItem key={key} {...segment}>
              <SegmentList onEnd={onEnd} {...segment} />
            </SegmentListItem>
          ) : (
            <SegmentListItemLink key={key} {...segment} />
          );
        })}
      </ReactSortable>
    </List>
  );
};

SegmentList.defaultProps = {
  isTopTier: false,
  label: 'init',
  segments: [],
};

SegmentList.propTypes = {
  isTopTier: PropTypes.bool,
  label: PropTypes.string,
  onEnd: PropTypes.func.isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default SegmentList;
