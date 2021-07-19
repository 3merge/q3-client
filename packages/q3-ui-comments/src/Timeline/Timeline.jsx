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
import Confirm from 'q3-ui-confirm';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { useAuth } from 'q3-ui-permissions';
import Dialog from '../Dialog';
import TimelineEntry from '../TimelineEntry';

const doesNotHaveReplies = (xs) => !xs?.replies;
const hasReplies = (id) => (xs) => xs?.replies === id;

const descending = (xs) => sortBy(xs, 'createdAt');
const ascending = (xs) => descending(xs).reverse();

const sortData = (xs, asc) => {
  const data = filter(xs, doesNotHaveReplies);
  return asc ? ascending(data) : descending(data);
};

// eslint-disable-next-line
export const NestedTimeline = ({ children }) => (
  <Box mt={1}>
    <MuiTimeline>{children}</MuiTimeline>
  </Box>
);

const Timeline = ({
  asc,
  data,
  remove,
  patch,
  post,
  insertNode,
  ...rest
}) => {
  const { collectionName } = rest;
  const auth = useAuth(collectionName);
  const { canCreateSub, HideByField } = auth;
  const path = 'comments';

  const renderDynamic = (args) =>
    isFunction(insertNode) ? insertNode(args, data) : null;

  const renderDialogControls = (comment) => (
    <>
      {comment?.createdBy?.id ===
        auth?.state?.profile?.id && (
        <>
          <HideByField path={path} op="Delete">
            <Confirm
              phrase="DELETE"
              service={remove(comment.id)}
              icon={DeleteOutlineIcon}
            />
          </HideByField>
          <HideByField path={path} op="Update">
            <Dialog
              label="edit"
              icon={EditIcon}
              initialValues={comment}
              onSubmit={patch(comment.id)}
              {...rest}
            />
          </HideByField>
        </>
      )}
      {!comment.replies && canCreateSub(path) && (
        <Dialog
          label="reply"
          icon={ReplyIcon}
          onSubmit={(args) =>
            post({
              ...args,
              replies: comment.id,
            })
          }
          {...rest}
        />
      )}
    </>
  );

  return (
    <MuiTimeline>
      {map(sortData(data, asc), (t) => {
        const replies = filter(data, hasReplies(t.id));

        return (
          <TimelineEntry
            key={t.id}
            {...t}
            actions={renderDialogControls(t)}
          >
            {renderDynamic(t)}
            {size(replies) > 0 && (
              <NestedTimeline>
                {map(ascending(replies), (item) => (
                  <TimelineEntry
                    actions={renderDialogControls(item)}
                    key={item.id}
                    connector
                    {...item}
                  >
                    {renderDynamic(item)}
                  </TimelineEntry>
                ))}
              </NestedTimeline>
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
  remove: PropTypes.func.isRequired,
  patch: PropTypes.func.isRequired,
  post: PropTypes.func.isRequired,
  insertNode: PropTypes.func,
};

export default Timeline;
