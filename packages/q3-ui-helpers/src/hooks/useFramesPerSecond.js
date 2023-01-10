import useBrowserLayoutEffect from './useBrowserLayoutEffect';

const useFramesPerSecond = (callback, options = {}) => {
  const { dependencies = [], fps = 30 } = options;

  useBrowserLayoutEffect(() => {
    let delta;
    let now;
    let stop;
    let then = Date.now();
    const interval = 1000 / fps;

    (async function loop() {
      if (!stop) {
        await requestAnimationFrame(loop);
        now = Date.now();
        delta = now - then;
      }

      if (delta > interval) {
        then = now - (delta % interval);

        try {
          await callback();
        } catch (e) {
          stop = true;
        }
      }
    })();

    return () => {
      stop = true;
    };
  }, dependencies);
};

export default useFramesPerSecond;
