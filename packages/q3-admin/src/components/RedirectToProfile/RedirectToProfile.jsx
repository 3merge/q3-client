import React from 'react';
import { useNavigate } from '@reach/router';
import useRelativePath from '../../hooks/useRelativePath';

const RedirectToProfile = () => {
  const navigate = useNavigate();
  const to = useRelativePath('account');

  React.useEffect(() => {
    navigate(to);
  }, []);

  return null;
};

export default RedirectToProfile;
