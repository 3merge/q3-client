import React from 'react';
import axios from 'axios';

export default (filepath) => {
  const [content, setContent] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    if (!filepath) {
      setLoading(false);
      return;
    }

    Promise.resolve(filepath)
      .then(({ default: r }) =>
        axios.create({ baseURL: '/' }).get(r),
      )
      .then(({ data }) => {
        setContent(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    content,
    loading,
    error,
  };
};
