const useWorkerFunction = (fn) => {
  const blob = new Blob([`onmessage=${fn.toString()}`], {
    type: 'text/javascript',
  });

  return new Worker(URL.createObjectURL(blob));
};

export default useWorkerFunction;
