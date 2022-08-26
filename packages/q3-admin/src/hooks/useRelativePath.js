import { compact, get } from 'lodash';
import useDomainContext from './useDomainContext';

const useRelativePath = (path = undefined) => {
  const output = compact([
    get(useDomainContext(), 'directory', '/'),
    path,
  ]).join('/');

  return output.startsWith('//') ? output.slice(1) : output;
};

export default useRelativePath;
