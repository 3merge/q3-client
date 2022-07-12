import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import { map, get } from 'lodash';
import classnames from 'classnames';
import { useDrop } from 'react-dnd';
import useUploadsDirectories from '../useUploadsDirectories';
import withDrag from '../withDrag';
import withFileIcon from '../withFileIcon';
import useStyle from './styles';
import FileManagerBatchContext from '../FileManagerBatchContext';

export const GalleryItemFolderIcon = React.memo(
  // eslint-disable-next-line
  withFileIcon(({ icon: Icon }) => <Icon />),
);

const GalleryItemFolder = React.forwardRef(
  ({ id, path, name, onClick }, ref) => {
    const fileIds = map(
      get(
        useUploadsDirectories(),
        `${path}.__${path}__`,
        [],
      ),
      'id',
    );

    const { checked = [], setChecked } = React.useContext(
      FileManagerBatchContext,
    );

    const [collected, drop] = useDrop(() => ({
      accept: ['item', 'folder'],
      collect(monitor) {
        return {
          isHovering: monitor.isOver({
            shallow: true,
          }),
        };
      },
      canDrop(item) {
        return item.id !== id;
      },
      drop() {
        return {
          path,
        };
      },
    }));

    const cls = useStyle({
      ...collected,
      isChecked: fileIds.every((fileId) =>
        checked.includes(fileId),
      ),
    });

    return (
      <Card
        ref={ref}
        className={classnames(cls.card, 'q3-folder')}
        data-id={id}
        variant="outlined"
      >
        <CardActionArea
          ref={drop}
          onClick={() => {
            setChecked(fileIds);
          }}
          onDoubleClick={onClick}
        >
          <CardContent>
            <Typography
              className={cls.title}
              component="p"
              variant="body2"
            >
              <GalleryItemFolderIcon isFolder />
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
);

GalleryItemFolder.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withDrag(GalleryItemFolder, 'folder');
