import React from 'react';
import Files from 'react-butterfiles';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { first } from 'lodash';
import IconButton from 'q3-ui/lib/iconButton';
import Quill from 'quill';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';

const ModuleImage = React.forwardRef(
  (
    {
      component: Component,
      captureSelection,
      selection,
      upload,
    },
    ref,
  ) => {
    return (
      <Files
        maxSize="10mb"
        onSuccess={(data) =>
          upload(first(data))
            .then((url) => {
              ref.current.insertEmbed(
                selection?.index,
                'image',
                url,
              );

              ref.current.setSelection(
                selection?.index + 1,
                Quill.sources.SILENT,
              );
            })
            .catch(() => {
              alert('uploadFailed.');
            })
        }
        onError={() => {
          alert('uploadFailed.');
        }}
      >
        {({ browseFiles }) =>
          Component ? (
            <Component
              icon={PermMediaIcon}
              onClick={captureSelection(browseFiles)}
            />
          ) : (
            <IconButton
              icon={PermMediaIcon}
              label="image"
              buttonProps={{
                onClick: captureSelection(browseFiles),
                type: 'button',
              }}
            />
          )
        }
      </Files>
    );
  },
);

ModuleImage.propTypes = propTypes;

export default withCurrentSelection(ModuleImage);
