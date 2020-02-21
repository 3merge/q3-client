export const SESSION_STORAGE_EVENT = 'storage';
export const SESSION_STORAGE_PURGE_EVENT = 'storage-purge';

export const isBrowserReady = (fn) =>
  typeof window !== 'undefined' ? fn() : null;

export default ({ id, dirty }) =>
  isBrowserReady(() =>
    window.dispatchEvent(
      new CustomEvent(SESSION_STORAGE_EVENT, {
        detail: {
          dirty,
          id,
        },
      }),
    ),
  );

export const onPurge = ({ id }) =>
  isBrowserReady(() =>
    window.dispatchEvent(
      new CustomEvent(SESSION_STORAGE_PURGE_EVENT, {
        detail: {
          id,
        },
      }),
    ),
  );
