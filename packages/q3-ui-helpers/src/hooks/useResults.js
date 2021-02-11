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

  const invokeService = React.useCallback(
    (stateValues) => {
      setLoading(true);
      console.log(term);
      return invoke(service, [term, stateValues])
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
    [term, loading],
  );

  React.useEffect(() => {
    return () => {
      cache.current = {};
    };
  });

  return {
    invokeService,
    run: React.useCallback(
      (stateValues) => {
        if (loading) return null;

        if (
          !isOfAdequateLength(term, minimumCharacterCount)
        )
          return setResults([]);

        try {
          if (
            cache.current[term.toLowerCase()] &&
            cache.current[term.toLowerCase()].length
          ) {
            setResults(cache.current[term.toLowerCase()]);
            return null;
          }

          throw new Error('Cache not found');
        } catch (e) {
          return invokeService(stateValues);
        }
      },
      [term],
    ),
    loading,
    results,
    setResults,
  };
};
