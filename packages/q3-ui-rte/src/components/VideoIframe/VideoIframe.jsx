import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import { VideoLibrary } from '@material-ui/icons';
import Quill from 'quill';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Popover from '../Popover';
import PopoverTextField from '../PopoverTextField';
import PopoverSave from '../PopoverSave';
import VideoBlot from '../VideoBlot';
import withCurrentSelection, {
  propTypes,
} from '../withCurrentSelection';

const VideoIframe = React.forwardRef(
  (
    { component: Component, captureSelection, selection },
    ref,
  ) => {
    React.useLayoutEffect(() => {
      Quill.register(VideoBlot, true);
    }, []);

    const theme = useTheme();
    const matches = useMediaQuery(
      theme.breakpoints.down('sm'),
    );

    const embed = (state, nextSelection) => {
      ref.current.insertEmbed(
        nextSelection
          ? nextSelection?.index
          : selection?.index,
        'iframe',
        state,
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

VideoIframe.propTypes = propTypes;

export default withCurrentSelection(VideoIframe);
