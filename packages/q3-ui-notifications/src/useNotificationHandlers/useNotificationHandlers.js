import { isNil, reduce } from 'lodash';
import { object } from 'q3-ui-helpers';
import { useNavigate } from '@reach/router';
import saveAs from 'file-saver';

const useNotificationHandlers = (
  data,
  restServices = {},
  messageType = null,
) => {
  const navigate = useNavigate();

  return reduce(
    data,
    (acc, curr) => {
      if (
        !isNil(messageType) &&
        messageType !== curr.messageType
      )
        return acc;

      const handlers = {};
      const { archived, id, localUrl, read, url } = curr;

      const appendHandler = (name, func) => () =>
        Object.assign(handlers, {
          [name]: restServices[func](id),
        });

      handlers.click = () =>
        object
          .noop(restServices.updateToRead(id))
          .then(() => {
            // otherwise navigating away will not mark as read
            if (url) saveAs(url);
            else if (localUrl) navigate(localUrl);
          });

      if (read) appendHandler('unread', 'updateToUnread');
      else appendHandler('read', 'updateToRead');

      if (archived)
        appendHandler('unarchive', 'updateToUnarchived');
      else appendHandler('archive', 'updateToArchived');

      return acc.concat({
        ...curr,
        handlers,
      });
    },
    [],
  );
};

export default useNotificationHandlers;
