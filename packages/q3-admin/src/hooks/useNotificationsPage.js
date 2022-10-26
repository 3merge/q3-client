import { useNavigate, useLocation } from '@reach/router';
import useRelativePath from './useRelativePath';

const useNotificationsPage = () => {
  const rel = 'notifications';

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const link = useRelativePath(rel);

  return {
    isOn() {
      return String(pathname).includes(rel);
    },
    visit() {
      navigate(link);
    },
  };
};

export default useNotificationsPage;
