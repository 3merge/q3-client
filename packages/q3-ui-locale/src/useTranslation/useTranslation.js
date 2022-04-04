import React from 'react';
import { compact, isString } from 'lodash';
import Context from '../context';

const HTML_ENTITY = '&colon;';

const replaceHtmlEntity = (str) => {
  const [a, ...b] = str.split(':');
  return compact([a, b.join(HTML_ENTITY)]).join(':');
};

const revertHtmlEntity = (str) =>
  isString(str)
    ? str.replace(new RegExp(HTML_ENTITY, 'g'), ':')
    : str;

const isRecognizedNamespace = (str) =>
  [
    'descriptions',
    'errors',
    'helpers',
    'labels',
    'messages',
    'titles',
  ].some((ns) => str.startsWith(ns))
    ? replaceHtmlEntity(str)
    : str.replace(/:/g, HTML_ENTITY);

const useTranslationPatch = (namespace) => {
  const { translate } = React.useContext(Context);

  return {
    t(key, args = {}) {
      const parts = isString(key)
        ? isRecognizedNamespace(key).split(':')
        : [];

      const [prefix, text] = parts;

      const lrhSingualr = (l, r) =>
        parts.length === 1 ? l : r;

      return revertHtmlEntity(
        translate(
          lrhSingualr(undefined, prefix) || namespace,
          lrhSingualr(prefix, text),
          args,
        ),
      );
    },
  };
};

export default useTranslationPatch;
