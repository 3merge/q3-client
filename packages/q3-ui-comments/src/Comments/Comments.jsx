import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import { isFunction, map } from 'lodash';
import { Box, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'q3-ui-locale';
import Create from '../Create';
import Sort from '../Sort';
import Timeline from '../Timeline';

const Comments = (props) => {
  const { map: customMap, collectionName, id } = props;
  const { t } = useTranslation();

  const {
    fetching,
    fetchingError,
    post,
    comments = [],
    ...rest
  } = useRest({
    url: `/${collectionName}/${id}/comments`,
    key: 'comments',
    pluralized: 'comments',
    runOnInit: true,
  });

  return (
    <Sort>
      {(state, ToggleRenderer) => {
        const renderTimeline = () => {
          if (fetching)
            return (
              <Box mt={1} textAlign="center" p={1}>
                <CircularProgress />
              </Box>
            );

          if (fetchingError)
            return (
              <Box mt={1}>
                <Alert severity="error">
                  <strong>{t('labels:error')} — </strong>
                  {t('descriptions:loadingCommentsFailed')}
                </Alert>
              </Box>
            );

          return (
            <Timeline
              {...props}
              {...rest}
              post={post}
              data={
                isFunction(customMap)
                  ? map(comments, customMap)
                  : comments
              }
              asc={state}
            />
          );
        };

        return (
          <>
            <Create key="create" onSubmit={post} {...props}>
              {ToggleRenderer}
            </Create>
            {renderTimeline()}
          </>
        );
      }}
    </Sort>
  );
};

Comments.defaultProps = {
  additionalFields: null,
  insertNode: null,
  map: null,
};

Comments.propTypes = {
  additionalFields: PropTypes.node,
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  insertNode: PropTypes.func,
  map: PropTypes.func,
};

export default Comments;
