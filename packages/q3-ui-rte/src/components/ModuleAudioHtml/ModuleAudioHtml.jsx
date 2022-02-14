import React from 'react';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import Upload from '../Upload';

const ModuleVideoHtml = React.forwardRef((props, ref) => (
  <Upload
    {...props}
    accept={[
      'audio/midi',
      'audio/mpeg',
      'audio/mp4',
      'audio/aac',
      'audio/wav',
    ]}
    blot="audio"
    maxSize="40mb"
    onSuccess={(url, file, index) =>
      ref.current.insertEmbed(index, 'audio', url)
    }
    ref={ref}
    updateSelection
  />
));

ModuleVideoHtml.propTypes = propTypes;

export default withCurrentSelection(ModuleVideoHtml, {
  icon: GraphicEqIcon,
  label: 'audio',
});
