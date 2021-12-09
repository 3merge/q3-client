import { useTranslation } from 'react-i18next';

const useTranslationPatch = (namespace) => {
  const [t] = useTranslation();

  return {
    t(key, args = {}) {
      const parts =
        typeof key === 'string' ? key.split(':') : [];

      const lrhSingualr = (l, r) =>
        parts.length === 1 ? l : r;

      return t(lrhSingualr(parts[0], parts[1]), {
        ns: lrhSingualr(undefined, parts[0]) || namespace,
        ...args,
      });
    },
  };
};

export default useTranslationPatch;
