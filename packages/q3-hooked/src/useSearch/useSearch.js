const useSearch = () => {};

export default useSearch;

const urls = [1, 2, 3];

const request = () => {};

const sendRequest = (urls) =>
  Promise.all(urls.map(request));
