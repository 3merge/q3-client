import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import FileExtensions from '../FileExtensions';

const useStyles = makeStyles(() => ({
  avatar: {
    width: '65%',
    height: '65%',
    '& svg': {
      width: '100%',
      height: '100%',
    },
  },
}));

const withAnchor = (Component) => ({ url, ...props }) =>
  url ? (
    <a href={url} target="_blank" rel="noreferrer">
      <Component url={url} {...props} />
    </a>
  ) : (
    <Component {...props} />
  );

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

  return (
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
        component={Box}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar
          style={{
            backgroundColor: 'transparent',
            color: FileExtensions.getColor(ext),
          }}
          className={cls.avatar}
        >
          {loading && <CircularProgress />}
          {FileExtensions.getIcon(ext)}
        </Avatar>
        <p
          style={{
            color: FileExtensions.getColor(ext),
          }}
        >
          {name}
        </p>
      </CardContent>
    </Card>
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

export default withAnchor(FolderGrid);
