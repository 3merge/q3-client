import React from 'react';
import { navigate } from 'gatsby';

// eslint-disable-next-line
const Redirect = ({ to }) => {
  React.useEffect(() => {
    navigate(to);
  }, []);

  return null;
};

export default Redirect;
