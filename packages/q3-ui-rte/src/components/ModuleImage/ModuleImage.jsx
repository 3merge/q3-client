import React from 'react';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import Upload from '../Upload';

const ModuleImage = React.forwardRef((props, ref) => (
  <Upload
    {...props}
    accept={[
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/webp',
    ]}
    blot="image"
    maxSize="5mb"
    onSuccess={(url, file, index) =>
      ref.current.insertEmbed(index, 'image', url)
    }
    ref={ref}
    updateSelection
  />
));

ModuleImage.propTypes = propTypes;

export default withCurrentSelection(ModuleImage, {
  icon: PermMediaIcon,
  label: 'image',
});
