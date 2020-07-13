import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { browser } from 'q3-ui-helpers';

const Fullscreen = () => {
  const [isFullscreen, setIsFullscreen] = React.useState(
    false,
  );

  const cancelFullScreen = (el) => {
    const requestMethod =
      el.cancelFullScreen ||
      el.webkitCancelFullScreen ||
      el.mozCancelFullScreen ||
      el.exitFullscreen;

    if (requestMethod) {
      requestMethod.call(el);
    }
  };

  const requestFullScreen = (el) => {
    const requestMethod =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    if (requestMethod) {
      requestMethod.call(el);
    }
  };

  const onClick = () => {
    const elem = document.body;
    const isInFullScreen =
      (document.fullScreenElement &&
        document.fullScreenElement !== null) ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;

    if (isInFullScreen) {
      cancelFullScreen(document);
    } else {
      requestFullScreen(elem);
    }
  };

  const detect = () => {
    setIsFullscreen(
      Boolean(
        (document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement) !== null,
      ),
    );
  };

  React.useEffect(() => {
    const listeners = [
      'fullscreenchange',
      'mozfullscreenchange',
      'MSFullscreenChange',
      'webkitfullscreenchange',
    ];

    if (!browser.isBrowserReady()) return undefined;

    listeners.forEach(() => {
      document.addEventListener(listeners, detect, false);
    });

    return () => {
      listeners.forEach(() => {
        document.removeEventListener(listeners, detect);
      });
    };
  }, []);

  return (
    <BottomNavigationAction
      label="Recents"
      onClick={onClick}
      icon={<FullscreenIcon />}
    />
  );
};

export default Fullscreen;
