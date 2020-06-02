import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Joyride, {
  ACTIONS,
  EVENTS,
  STATUS,
} from 'react-joyride';
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

const Tour = ({ steps, onDone, previouslySeen }) => {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [activeSteps, setActiveSteps] = React.useState(
    steps.filter(({ target }) =>
      previouslySeen
        ? !previouslySeen.includes(target)
        : true,
    ),
  );

  const [running, setRunning] = React.useState(false);
  const hasLength = activeSteps.length > 0;

  const [
    completedSteps,
    setCompletedSteps,
  ] = React.useState([]);

  const handleJoyrideCallback = (data) => {
    let completed = [];
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
      const a = activeSteps;
      a.splice(index + 1);

      completed = [
        ...completedSteps,
        ...a.map((v) => v.target),
      ];

      setStepIndex(
        index + (action === ACTIONS.PREV ? -1 : 1),
      );
    } else if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(status)
    ) {
      completed = activeSteps.map(({ target }) => target);
    }

    if (
      ((action === 'close' && type === 'step:after') ||
        [STATUS.FINISHED, STATUS.SKIPPED].includes(
          status,
        )) &&
      onDone
    )
      onDone(completed);

    setCompletedSteps(completed);
  };

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return null;
    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver;

    const observer = new MutationObserver(() => {
      setActiveSteps(
        activeSteps.filter(({ target }) =>
          document.querySelector(target),
        ),
      );
    });

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
            zIndex: 1000000,
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

  previouslySeen: PropTypes.arrayOf(PropTypes.string),
  onDone: PropTypes.func.isRequired,
};

Tour.defaultProps = {
  previouslySeen: [],
};

export default Tour;
