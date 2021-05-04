import React from 'react';
import { Box } from '@material-ui/core';
import { map, filter, size } from 'lodash';
import Timeline from '@material-ui/lab/Timeline';
import Confirm from 'q3-ui-confirm';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { AuthContext } from 'q3-ui-permissions';
import Dialog from '../Dialog';
import TimelineEntry from '../TimelineEntry';

const doesNotHaveReplies = (xs) => !xs?.replies;
const hasReplies = (id) => (xs) => xs?.replies === id;

const sortData = (xs, asc) => {
  const data = filter(xs, doesNotHaveReplies);
  return asc ? data.reverse() : data;
};

export default ({
  asc,
  data,
  remove,
  patch,
  post,
  ...rest
}) => {
  const auth = React.useContext(AuthContext);

  const renderDialogControls = (comment) => [
    ...(comment?.createdBy?.id === auth?.state?.profile?.id
      ? [
          <Confirm
            phrase="DELETE"
            service={remove(comment.id)}
            icon={DeleteOutlineIcon}
          />,
          <Dialog
            label="edit"
            icon={EditIcon}
            initialValues={comment}
            onSubmit={patch(comment.id)}
            {...rest}
          />,
        ]
      : []),
    ...(!comment.replies
      ? [
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
          />,
        ]
      : []),
  ];

  return (
    <Timeline>
      {map(sortData(data, asc), (t) => {
        const replies = filter(data, hasReplies(t.id));

        return (
          <TimelineEntry {...t}>
            {renderDialogControls(t)}
            {size(replies) > 0 && (
              <Box mt={1}>
                <Timeline style={{ marginLeft: '-.4rem' }}>
                  {map(replies.reverse(), (item) => (
                    <TimelineEntry connector {...item}>
                      {renderDialogControls(item)}
                    </TimelineEntry>
                  ))}
                </Timeline>
              </Box>
            )}
          </TimelineEntry>
        );
      })}
    </Timeline>
  );
};
