import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import { isObject } from 'lodash';
import Quill from 'quill';
import RemoveIcon from '@material-ui/icons/Remove';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import useBlot from '../useBlot';

const ModuleDivider = React.forwardRef(
  ({ component: Component, captureSelection }, ref) => {
    useBlot('divider');

    const handleClick = captureSelection((selection) => {
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
    });

    return Component ? (
      <Component icon={RemoveIcon} onClick={handleClick} />
    ) : (
      <IconButton
        icon={RemoveIcon}
        label="divider"
        buttonProps={{
          onClick: handleClick,
          type: 'button',
        }}
      />
    );
  },
);

ModuleDivider.propTypes = propTypes;

export default withCurrentSelection(ModuleDivider);
