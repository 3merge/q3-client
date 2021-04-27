import React from 'react';
import { isObject } from 'lodash';
import Quill from 'quill';
import RemoveIcon from '@material-ui/icons/Remove';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import useBlot from '../useBlot';

const ModuleDivider = React.forwardRef(
  ({ buttonComponent: Component, selection }, ref) => {
    useBlot('divider');

    const handleClick = () => {
      const editor = ref.current;
      const index = selection?.index || 0;
      if (!isObject(editor)) return;

      editor.insertText(index, '\n', Quill.sources.USER);

      editor.insertEmbed(
        index + 1,
        'divider',
        true,
        Quill.sources.USER,
      );

      editor.setSelection(index + 2, Quill.sources.SILENT);
    };

    return <Component onClick={handleClick} />;
  },
);

ModuleDivider.propTypes = propTypes;

export default withCurrentSelection(ModuleDivider, {
  icon: RemoveIcon,
  label: 'divider',
});
