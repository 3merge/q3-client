import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  IconButton,
  CardHeader,
  Box,
} from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { string } from 'q3-ui-helpers';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Grow from '@material-ui/core/Grow';
import { useCardStyle, useHeaderStyle } from './styles';
import usePin from '../usePin';
import NoteEdit from '../NoteEdit';
import NoteTags from '../NoteTags';

const Note = (props) => {
  const { createdAt, title, message, pin, id, timeout } =
    props;

  const { isPinned, toggle } = usePin(id, pin);
  const cardClasses = useCardStyle();
  const headerClasses = useHeaderStyle();

  const resolvedTitle = title || 'Untitled';

  return (
    <Grow in timeout={timeout}>
      <Box width="100%">
        <NoteEdit>
          {({
            EditorComponent,
            IconComponent,
            canEdit,
            isEditing,
            edit,
          }) => (
            <Card classes={cardClasses}>
              <CardHeader
                action={
                  <>
                    {canEdit && (
                      <IconButton
                        color="inherit"
                        onClick={edit}
                      >
                        <IconComponent />
                      </IconButton>
                    )}
                    <IconButton
                      color="inherit"
                      onClick={toggle}
                    >
                      {isPinned ? (
                        <BookmarkIcon />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </IconButton>
                  </>
                }
                classes={headerClasses}
                subheader={resolvedTitle}
                title={string.toDate(createdAt)}
              />
              <CardContent>
                {isEditing ? (
                  <EditorComponent {...props} />
                ) : (
                  message
                )}
              </CardContent>
              <NoteTags {...props} />
            </Card>
          )}
        </NoteEdit>
      </Box>
    </Grow>
  );
};

Note.defaultProps = {
  createdAt: new Date().toISOString(),
  message: '',
  pin: false,
  timeout: 0,
  title: '',
};

Note.propTypes = {
  createdAt: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  message: PropTypes.string,
  pin: PropTypes.bool,
  timeout: PropTypes.number,
  title: PropTypes.string,
};

export default Note;
