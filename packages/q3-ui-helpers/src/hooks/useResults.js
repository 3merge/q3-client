import React from 'react';

export const invoke = (fn, arg) =>
  // eslint-disable-next-line
  Array.isArray(arg) ? fn.apply(null, arg) : fn(arg);

export const isOfAdequateLength = (term, len) => {
  const meetsReq = (v) =>
    typeof v === 'string' && v.length >= len;

  return Array.isArray(term)
    ? meetsReq(term[0])
    : meetsReq(term);
};

export default (
  service,
  term,
  defaultState = [],
  minimumCharacterCount = 2,
) => {
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState(
    defaultState,
  );

  const cache = React.useRef({});

  React.useCallback(() => {
    return () => {
      cache.current = {};
    };
  });

  return {
    run: React.useCallback(
      (s) => {
        if (
          !isOfAdequateLength(term, minimumCharacterCount)
        )
          return setResults([]);

        if (loading) return null;

        try {
          if (
            cache.current[term.toLowerCase()] &&
            cache.current[term.toLowerCase()].length
          ) {
            setResults(cache.current[term.toLowerCase()]);
            return null;
          }
        } catch (e) {
          // noop
        }

        setLoading(true);

        return invoke(service, [].concat([term, s]).flat())
          .then((r) => {
            cache.current[term] = r;
            setResults(r);
            return r;
          })
          .catch(() => {
            const out = [];
            setResults(out);
            return out;
          })
          .finally(() => {
            setLoading(false);
          });
      },
      [term],
    ),
    loading,
    results,
    setResults,
  };
};
