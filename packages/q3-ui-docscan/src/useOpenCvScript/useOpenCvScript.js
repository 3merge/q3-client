import { useScript } from 'q3-ui-helpers/lib/hooks';

const useOpenCvScript = () => {
  const {
    error = false,
    init = false,
    instance: cv,
  } = useScript(
    'https://cdn.jsdelivr.net/npm/opencv-browser@1.0.0/opencv.min.js',
    'cv',
  );

  return {
    cv,
    error,
    // confirming CV has been declared in window scope
    isReady: init && !error && typeof cv === 'object',
  };
};

export default useOpenCvScript;
