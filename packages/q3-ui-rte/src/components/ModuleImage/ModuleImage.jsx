import React from 'react';
import Files from 'react-butterfiles';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { first } from 'lodash';
import Quill from 'quill';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';

const ModuleImage = React.forwardRef(
  ({ buttonComponent, selection, upload }, ref) => {
    return (
      <Files
        maxSize="10mb"
        onSuccess={(data) => {
          return upload(first(data))
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
            });
        }}
        onError={() => {
          alert('uploadFailed.');
        }}
      >
        {({ browseFiles }) => {
          const Button = buttonComponent;
          return <Button onClick={browseFiles} />;
        }}
      </Files>
    );
  },
);

ModuleImage.propTypes = propTypes;

export default withCurrentSelection(ModuleImage, {
  icon: PermMediaIcon,
  label: 'image',
});
