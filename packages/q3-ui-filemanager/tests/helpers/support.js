import { first, uniq } from 'lodash';

const getNamesFrom = (selector) => (el) => {
  const folders = [];
  el.find(selector).forEach((node) =>
    // otherwise the mb size shows up in text
    folders.push(first(String(node.text()).split(/[0-9]/))),
  );

  return uniq(folders);
};

export const getFileNames = getNamesFrom('.q3-file');
export const getFolderNames = getNamesFrom('.q3-folder');
