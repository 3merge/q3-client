export const STATUS_READY = 'Ready';
export const STATUS_INITIALIZING = 'Initializing';

export const orTruthy = (v, next) => (v ? next : true);

export const getInitialStatus = (len, value) => {
  if (len) return value || STATUS_READY;
  return STATUS_INITIALIZING;
};
