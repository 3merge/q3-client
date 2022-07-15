import React from 'react';
import { invoke, get } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import PropTypes from 'prop-types';

export const ThreadContext = React.createContext({});
export default ThreadContext;

export const ThreadContextProvider = ({
  // canCreate,
  // canEdit,
  // canDelete,
  // canSee,
  collectionName,
  children,
  enablePins,
  enableTags,
  enableTitles,
  ...props
}) => {
  const auth = useAuth(collectionName);
  const key = 'thread';

  const authState = React.useMemo(() => {
    const topLevelAuthState = [
      'canCreate',
      'canEdit',
      'canDelete',
      'canSee',
    ].reduce((acc, curr) => {
      acc[curr] =
        invoke(auth, `${curr}Sub`, key) && get(props, curr);
      return acc;
    }, {});

    const checkTopLevelAuth = (sub) =>
      topLevelAuthState.canSee &&
      topLevelAuthState.canCreate &&
      topLevelAuthState.canEdit &&
      auth.canSeeSub(`${key}.${sub}`) &&
      auth.canCreateSub(`${key}.${sub}`) &&
      auth.canEditSub(`${key}.${sub}`);

    return {
      canPin: checkTopLevelAuth('pin') && enablePins,
      canTag: checkTopLevelAuth('tags') && enableTags,
      canTitle: checkTopLevelAuth('title') && enableTitles,
      ...topLevelAuthState,
    };
  }, []);

  return (
    <ThreadContext.Provider value={authState}>
      {children}
    </ThreadContext.Provider>
  );
};

ThreadContextProvider.defaultProps = {
  canCreate: true,
  canEdit: true,
  canDelete: true,
  canSee: true,
  children: null,
  enablePins: true,
  enableTags: true,
  enableTitles: true,
};

ThreadContextProvider.propTypes = {
  canCreate: PropTypes.bool,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
  canSee: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  collectionName: PropTypes.string.isRequired,
  enablePins: PropTypes.bool,
  enableTags: PropTypes.bool,
  enableTitles: PropTypes.bool,
};
