import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardHeader,
  CardActionArea,
  Collapse,
  Fade,
  lighten,
} from '@material-ui/core';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { map, truncate } from 'lodash';
import { string } from 'q3-ui-helpers';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import LabelIcon from '@material-ui/icons/Label';

const Note = ({
  color,
  createdAt,
  title,
  tags,
  message,
  pin,
}) => {
  const [show, setShow] = React.useState(false);

  // usePin.
  // useColor
  // use edit... OPEN DRAWER.
  console.log(pin);

  return (
    <Box mb={1}>
      <Card
        style={{
          backgroundColor: color
            ? lighten(color, 0.91)
            : undefined,
        }}
        variant="outlined"
      >
        <CardActionArea
          onClick={() => setShow((prevState) => !prevState)}
        >
          <CardHeader
            action={
              <>
                <Fade in={show}>
                  <IconButton>S</IconButton>
                </Fade>
                <IconButton>
                  {pin === true ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                </IconButton>
              </>
            }
            subheader={title || truncate(message, 35)}
          />
          <Collapse in={show}>
            <CardContent>{message}</CardContent>
          </Collapse>
          <CardActions>
            {string.toDate(createdAt)}
            {map(tags, (tag) => (
              <>
                <LabelIcon />
                {tag}
              </>
            ))}
          </CardActions>
        </CardActionArea>
      </Card>
    </Box>
  );
};

Note.propTypes = {};

export default Note;
