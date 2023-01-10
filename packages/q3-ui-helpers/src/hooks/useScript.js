import React from 'react';
import { get, isFunction, isNil } from 'lodash';
import * as browser from '../browser';

const useScript = (src, namespace, getInstanceCallback) => {
  const [scriptState, setScriptState] = React.useState({});

  function handleError() {
    return setScriptState({
      el: this,
      error: true,
      init: true,
      instance: null,
      isReady: false,
    });
  }

  function handleLoad() {
    const instance = isFunction(getInstanceCallback)
      ? getInstanceCallback()
      : get(window, namespace, null);

    return setScriptState({
      el: this,
      error: false,
      init: true,
      instance,
      isReady: !isNil(instance),
    });
  }

  React.useEffect(() => {
    if (!browser.isBrowserReady()) {
      return undefined;
    }

    const id = `script-${namespace}`;
    const existingScript = document.getElementById(id);
    const newScript = document.createElement('script');

    if (existingScript) {
      handleLoad.call(existingScript);
      return undefined;
    }

    newScript.addEventListener('load', handleLoad);
    newScript.addEventListener('error', handleError);
    newScript.id = id;
    newScript.src = src;

    document.body.appendChild(newScript);

    return () => {
      if (newScript) {
        newScript.removeEventListener('load', handleLoad);
        newScript.removeEventListener('error', handleLoad);
      }
    };
  }, []);

  return scriptState;
};

export default useScript;
