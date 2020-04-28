import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Joyride, {
  ACTIONS,
  EVENTS,
  STATUS,
} from 'react-joyride';
import { orange } from '@material-ui/core/colors';
import { browser } from 'q3-ui-helpers';
import Tooltip from './tooltip';

const { proxyLocalStorageApi } = browser;
export const storageKey = 'q3-tourist';

const defaultToEmptyString = (str) =>
  String(
    typeof str === 'string' && str !== 'null' ? str : '',
  );

const getFromStorage = () =>
  defaultToEmptyString(
    proxyLocalStorageApi('getItem', storageKey),
  );

export const addToList = (original, next) =>
  defaultToEmptyString(original)
    .split(',')
    .concat(next)
    .join(',');

export const addToLocalStorage = (newValue) =>
  proxyLocalStorageApi(
    'setItem',
    storageKey,
    addToList(getFromStorage(), newValue),
  );

export const filterByLocalStorage = ({ target }) =>
  !getFromStorage().includes(target);

const Tour = ({ steps }) => {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [activeSteps, setActiveSteps] = React.useState(
    steps.filter(filterByLocalStorage),
  );
  const [running, setRunning] = React.useState(false);
  const hasLength = activeSteps.length > 0;

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if (
      status === STATUS.RUNNING &&
      type === EVENTS.TOOLTIP
    )
      setRunning(true);

    if (
      [EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(
        type,
      )
    ) {
      addToLocalStorage(get(activeSteps[index], 'target'));
      setStepIndex(
        index + (action === ACTIONS.PREV ? -1 : 1),
      );
    } else if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(status)
    ) {
      // / setRunning(false);
      addToLocalStorage(
        activeSteps.map(({ target }) => target).join(','),
      );
    }
  };

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return null;
    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver;

    const observer = new MutationObserver(() =>
      setActiveSteps(
        activeSteps.filter(({ target }) =>
          document.querySelector(target),
        ),
      ),
    );

    observer.observe(document, {
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [running]);

  return (
    hasLength && (
      <Joyride
        run
        continuous
        steps={activeSteps}
        tooltipComponent={Tooltip}
        callback={handleJoyrideCallback}
        stepIndex={stepIndex}
        styles={{
          options: {
            primaryColor: orange[900],
          },
        }}
      />
    )
  );
};

Tour.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      title: PropTypes.string,
      target: PropTypes.string,
    }),
  ).isRequired,
};

export default Tour;
