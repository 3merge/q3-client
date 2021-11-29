import { useTranslation } from 'react-i18next';

const useTranslationPatch = (namespace) => {
  const [t] = useTranslation();

  return {
    t(key) {
      const localKeyPrefix = String(key).split(':')[0];
      const keyPrefix =
        localKeyPrefix !== 'undefined'
          ? localKeyPrefix
          : namespace;

      return t(key, {
        keyPrefix,
      });
    },
  };
};

export default useTranslationPatch;
