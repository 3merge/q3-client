import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import {
  isFunction,
  map,
  filter,
  size,
  sortBy,
} from 'lodash';
import MuiTimeline from '@material-ui/lab/Timeline';
import { useAuth } from 'q3-ui-permissions';
import ForumIcon from '@material-ui/icons/Forum';
import Dialog from '../Dialog';
import TimelineEntry from '../TimelineEntry';
import TimelineActions from '../TimelineActions';
import InlineButton from '../InlineButton/InlineButton';
import useStyle from './styles';

const doesNotHaveReplies = (xs) => !xs?.replies;
const hasReplies = (id) => (xs) => xs?.replies === id;

const descending = (xs) => sortBy(xs, 'createdAt');
const ascending = (xs) => descending(xs).reverse();

const sortData = (xs, asc) => {
  const data = filter(xs, doesNotHaveReplies);
  return asc ? ascending(data) : descending(data);
};

// eslint-disable-next-line
export const NestedTimeline = ({ children, ...props }) => (
  <Box mt={1}>
    <MuiTimeline {...props}>{children}</MuiTimeline>
  </Box>
);

const Timeline = ({ asc, data, insertNode, ...rest }) => {
  const { collectionName } = rest;
  const auth = useAuth(collectionName);
  const cls = useStyle();

  const { canCreateSub } = auth;
  const path = 'comments';

  const renderDynamic = (args) =>
    isFunction(insertNode) ? insertNode(args, data) : null;

  return (
    <MuiTimeline className={cls.container}>
      {map(sortData(data, asc), (t) => {
        const replies = filter(data, hasReplies(t.id));

        return (
          <TimelineEntry
            key={t.id}
            {...t}
            actions={
              <TimelineActions
                comment={t}
                field={path}
                {...rest}
              />
            }
          >
            {renderDynamic(t)}
            {size(replies) > 0 && (
              <NestedTimeline className={cls.root}>
                {map(ascending(replies), (item) => (
                  <TimelineEntry
                    actions={
                      <TimelineActions
                        comment={item}
                        field={path}
                        {...rest}
                      />
                    }
                    key={item.id}
                    connector
                    {...item}
                  >
                    {renderDynamic(item)}
                  </TimelineEntry>
                ))}
              </NestedTimeline>
            )}
            {canCreateSub(path) && (
              <Dialog
                renderTrigger={(onClick) => (
                  <InlineButton
                    icon={ForumIcon}
                    onClick={onClick}
                    label="reply"
                  />
                )}
                label="reply"
                onSubmit={(args) =>
                  rest.post({
                    ...args,
                    replies: t?.id,
                  })
                }
                {...rest}
              />
            )}
          </TimelineEntry>
        );
      })}
    </MuiTimeline>
  );
};

Timeline.defaultProps = {
  asc: true,
  insertNode: null,
};

Timeline.propTypes = {
  asc: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // eslint-disable-next-line
      createdBy: PropTypes.object,
      message: PropTypes.string,
      id: PropTypes.string,
    }),
  ).isRequired,
  insertNode: PropTypes.func,
};

export default Timeline;
