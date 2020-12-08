import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import FileExtensions from '../FileExtensions';
import FileAvatarIcon from '../FileAvatarIcon';
import useStyles from './useStyles';

const FolderGrid = ({
  name,
  url,
  onClick,
  loading,
  onDelete,
  id,
}) => {
  const cls = useStyles();
  const [, ext] = name.split('.');

  /**
   * @NOTE
   * There is a similar object in the FileName renderer.
   * Maybe there's a way to move this around so our next component doesn't also need to define these props?
   */
  const anchorProps = url
    ? {
        href: url,
        target: '_blank',
        rel: 'noreferrer',
      }
    : {};

  return (
    <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
      <Card onClick={onClick} style={{ cursor: 'pointer' }}>
        {url && (
          <CardHeader
            action={
              <IconButton onDelete={onDelete(id)}>
                <Delete />
              </IconButton>
            }
          />
        )}
        <CardContent
          component={url ? 'a' : Box}
          className={cls.card}
          {...anchorProps}
        >
          <FileAvatarIcon
            loading={loading}
            ext={ext}
            className={cls.avatar}
          />
          <p
            style={{
              color: FileExtensions.getColor(ext),
            }}
          >
            {name}
          </p>
        </CardContent>
      </Card>
    </Grid>
  );
};

FolderGrid.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  id: PropTypes.string,
};

FolderGrid.defaultProps = {
  loading: false,
  onClick: null,
  url: '',
  onDelete: () => {},
  id: '',
};

export default FolderGrid;
