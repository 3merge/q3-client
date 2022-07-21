const useTitle = ({ title }) =>
  title === null ||
  title === undefined ||
  title === 'null' ||
  title === 'undefined'
    ? ''
    : title;

export default useTitle;
