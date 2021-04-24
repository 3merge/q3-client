import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import { VideoLibrary } from '@material-ui/icons';
import Quill from 'quill';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Popover from '../Popover';
import PopoverTextField from '../PopoverTextField';
import PopoverSave from '../PopoverSave';
import BlotVideo from '../BlotVideo';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';
import { toEmbed } from '../../adapters';

export const ModuleVideo = React.forwardRef(
  (
    { component: Component, captureSelection, selection },
    ref,
  ) => {
    React.useLayoutEffect(() => {
      Quill.register(BlotVideo, true);
    }, []);

    const theme = useTheme();
    const matches = useMediaQuery(
      theme.breakpoints.up('sm'),
    );

    const embed = (state, nextSelection) => {
      ref.current.insertEmbed(
        nextSelection
          ? nextSelection?.index
          : selection?.index,
        'iframe',
        toEmbed(state),
      );
    };

    return (
      <Popover
        button={({ onClick }) => {
          const fn = matches
            ? onClick
            : (s) => {
                embed(prompt(), s);
              };

          return Component ? (
            <Component
              icon={VideoLibrary}
              onClick={captureSelection(fn)}
            />
          ) : (
            <IconButton
              icon={VideoLibrary}
              label="video"
              buttonProps={{
                type: 'button',
                onClick: captureSelection(fn),
              }}
            />
          );
        }}
      >
        {(close) => (
          <PopoverTextField>
            {(state) => (
              <PopoverSave
                onClick={(e) => {
                  e.preventDefault();
                  embed(state, selection);
                  close();
                }}
              />
            )}
          </PopoverTextField>
        )}
      </Popover>
    );
  },
);

ModuleVideo.propTypes = propTypes;

export default withCurrentSelection(ModuleVideo);
