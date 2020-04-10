import React from 'react';

const useAutocompleteSearchResults = (getResults, term) => {
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (term) {
      setLoading(true);
      getResults(term)
        .then((r) => {
          setResults(r);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [term]);

  return {
    loading,
    results,
  };
};

export default useAutocompleteSearchResults;
