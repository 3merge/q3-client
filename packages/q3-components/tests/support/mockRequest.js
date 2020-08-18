export const simulateNetworkDelay = (values) =>
  new Promise((r) => {
    setTimeout(() => {
      r(values);
    }, 2500);
  });
