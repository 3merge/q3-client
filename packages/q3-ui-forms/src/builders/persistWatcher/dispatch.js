import { SESSION_STORAGE_EVENT } from '.';

export default ({ id, dirty }) =>
  window.dispatchEvent(
    new CustomEvent(SESSION_STORAGE_EVENT, {
      detail: {
        dirty,
        id,
      },
    }),
  );
