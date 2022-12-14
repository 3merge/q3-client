import { useScript } from 'q3-ui-helpers/lib/hooks';
import { CDN } from '../constants';

const useOpenCvScript = () => {
  const {
    error = false,
    init = false,
    instance: cv,
  } = useScript(CDN, 'cv');

  return {
    cv,
    error,
    // confirming CV has been declared in window scope
    isReady: init && !error && typeof cv === 'object',
  };
};

export default useOpenCvScript;
