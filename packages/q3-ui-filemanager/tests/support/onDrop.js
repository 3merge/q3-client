const simulateNetworkRequestLatency = (next) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      next(resolve, reject);
    }, 1500);
  });

export const succeed = () =>
  simulateNetworkRequestLatency((res) => {
    res([]);
  });

export const fail = () =>
  simulateNetworkRequestLatency((res, rej) => {
    rej(new Error('Something went wrong'));
  });
