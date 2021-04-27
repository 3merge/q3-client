import React from 'react';
import { Link as LinkIcon } from '@material-ui/icons';
import { isObject, size } from 'lodash';
import Quill from 'quill';
import Popover from '../Popover';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';

const ModuleLink = React.forwardRef(
  ({ buttonComponent: Component, selection }, ref) => (
    <Popover
      button={Component}
      onSave={(state) => {
        const quill = ref?.current;
        const s = selection;

        if (!isObject(s) || !size(state)) return;
        quill.format('link', state, Quill.sources.USER);
        quill.update();
        quill.focus();
        quill.setSelection(s);
      }}
    />
  ),
);

ModuleLink.propTypes = propTypes;

export default withCurrentSelection(ModuleLink, {
  icon: LinkIcon,
  label: 'hyperlink',
});
