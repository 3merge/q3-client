const ArchiveBuilder = require('./archive');
const loadContent = require('./loadContent');
const {
  appendSiblingsToContext,
  paginateArchiveContext,
} = require('./pagination');
const slug = require('./slug');
const slugType = require('./slugType');
const setup = require('./setup');

module.exports = {
  ArchiveBuilder,
  loadContent,
  appendSiblingsToContext,
  paginateArchiveContext,
  setup,
  slug,
  slugType,
};
