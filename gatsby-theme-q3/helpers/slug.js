const slugify = require('slugify');

const getSlug = (target) => {
  const keys = ['slug', 'title', 'name', 'contentful_id'];

  let slug;
  let i = 0;

  do {
    const v = target[keys[i]];
    if (v)
      slug = slugify(v, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
      });

    i += 1;
  } while (!slug);

  return slug;
};

const getDirectoryPath = (v) => {
  if (typeof v !== 'string') return '/';
  return v.startsWith('/') ? v : `/${v}`;
};

module.exports = (node = {}, basepath = '/') =>
  [getDirectoryPath(basepath), getSlug(node)].join('/');
