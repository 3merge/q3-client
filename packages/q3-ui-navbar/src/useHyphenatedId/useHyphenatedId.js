import { compact, lowerCase } from 'lodash';

const useHyphenatedId = (prefix) => (suffix) =>
  compact([prefix, suffix]).map(lowerCase).join('-');

export default useHyphenatedId;
