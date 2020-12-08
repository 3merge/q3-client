import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import FileExtensions from '../FileExtensions';
import FileAvatarIcon from '../FileAvatarIcon';
import { getUrlOrOnClickProps } from '../utils';
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
          {...getUrlOrOnClickProps(url)}
          className={cls.card}
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
