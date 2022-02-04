import React from 'react';
import Context from '../context';

const useTranslationPatch = (namespace) => {
  const { translate } = React.useContext(Context);

  return {
    t(key, args = {}) {
      const parts =
        typeof key === 'string' ? key.split(':') : [];

      const lrhSingualr = (l, r) =>
        parts.length === 1 ? l : r;

      return translate(
        lrhSingualr(undefined, parts[0]) || namespace,
        lrhSingualr(parts[0], parts[1]),
        args,
      );
    },
  };
};

export default useTranslationPatch;
