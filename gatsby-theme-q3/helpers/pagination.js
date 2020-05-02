const { get } = require('lodash');

const getId = (v) => get(v, 'contentful_id');

const genCursor = (a = [], i = 0) => ({
  isFirst: i === 0,
  isLast: i === a.length - 1,
  next: a[i + 1],
  prev: a[i - 1],
  first: a[0],
  last: a[a.length - 1],
});

const joinArchiveUrlWithPageNumber = (url, page) =>
  `${url}/${page}`;

const getPreviousArchiveUrl = (archiveUrl, page) => {
  if (page === 2) return archiveUrl;
  if (page !== 1)
    return joinArchiveUrlWithPageNumber(
      archiveUrl,
      page - 1,
    );

  return null;
};

const getNextArchiveUrl = (
  archiveUrl,
  page,
  totalNumberOfPages,
) => {
  if (page < totalNumberOfPages)
    return joinArchiveUrlWithPageNumber(
      archiveUrl,
      page + 1,
    );

  return null;
};

const getCurrentArchiveUrl = (archiveUrl, page) =>
  page < 2
    ? archiveUrl
    : joinArchiveUrlWithPageNumber(archiveUrl, page);

const getNumberOfPages = (
  entries = [],
  postsPerPage = 15,
) => {
  const len = Array.isArray(entries) ? entries.length : 0;
  return Math.ceil(len / postsPerPage);
};

const appendSiblingsToContext = (entries) =>
  entries.map((node, i) => {
    const cursor = genCursor(entries, i);
    const prev = getId(
      cursor.isFirst ? cursor.last : cursor.prev,
    );

    const next = getId(
      cursor.isLast ? cursor.first : cursor.next,
    );

    return {
      ...node,
      prev,
      next,
    };
  });

const paginateArchiveContext = (entries = [], pathName) => {
  const postsPerPage = 15;
  const numPages = getNumberOfPages(entries, postsPerPage);
  const output = [];

  for (let i = 0; i < numPages; i += 1) {
    const page = i + 1; // always offset for pretty URLs
    const path = getCurrentArchiveUrl(pathName, page);
    const prev = getPreviousArchiveUrl(pathName, page);
    const next = getNextArchiveUrl(
      pathName,
      page,
      numPages,
    );

    output.push({
      limit: postsPerPage,
      skip: i * postsPerPage,
      total: numPages,
      pageNum: i,
      path,
      next,
      prev,
    });
  }

  return output;
};

module.exports = {
  appendSiblingsToContext,
  genCursor,
  getNextArchiveUrl,
  getNumberOfPages,
  getPreviousArchiveUrl,
  paginateArchiveContext,
};
