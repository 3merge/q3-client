import React from 'react';
import Quill from 'quill';
import { VideoLibrary } from '@material-ui/icons';
import Popover from '../Popover';
import BlotVideo from '../BlotVideo';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import { toEmbed } from '../../adapters';

export const ModuleVideo = React.forwardRef(
  ({ buttonComponent, selection }, ref) => {
    React.useLayoutEffect(() => {
      Quill.register(BlotVideo, true);
    }, []);

    return (
      <Popover
        label="videoUrl"
        button={buttonComponent}
        onSave={(state) => {
          ref.current.insertEmbed(
            selection?.index,
            'iframe',
            toEmbed(state),
          );
        }}
      />
    );
  },
);

ModuleVideo.propTypes = propTypes;

export default withCurrentSelection(ModuleVideo, {
  label: 'embed',
  icon: VideoLibrary,
});
