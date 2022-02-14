import React from 'react';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import Upload from '../Upload';

const ModuleVideoHtml = React.forwardRef((props, ref) => (
  <Upload
    {...props}
    accept={['video/mp4', 'video/webm', 'video/ogg']}
    blot="video"
    maxSize="40mb"
    onSuccess={(url, file, index) => {
      ref.current.insertEmbed(index, 'video', url);
    }}
    updateSelection
    ref={ref}
  />
));

ModuleVideoHtml.propTypes = propTypes;

export default withCurrentSelection(ModuleVideoHtml, {
  icon: MovieFilterIcon,
  label: 'video',
});
