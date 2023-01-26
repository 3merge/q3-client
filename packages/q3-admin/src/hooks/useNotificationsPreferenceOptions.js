import { get, map } from 'lodash';
import { array } from 'q3-ui-helpers';
import useDomainContext from './useDomainContext';
import useRole from './useRole';

const useNotificationsPreferenceOptions = (variant) => {
  const domain = useDomainContext();
  const { role } = useRole();
  const options = array.is(
    get(domain?.domain?.listens, role, []),
  );

  return variant
    ? options.reduce((acc, item) => {
        if (item.includes('__')) {
          if (item.includes(`__${variant}`)) acc.push(item);
        } else acc.push(`${item}__${variant}`);
        return acc;
      }, [])
    : options;
};

export default useNotificationsPreferenceOptions;
