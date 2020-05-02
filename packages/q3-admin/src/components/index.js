export { default as App } from './app';
export { default as NotFound } from './404';
export { default as Loader } from './loader';
export { default as Main } from './main';
export { default as Public } from './public';

/**
 * @NOTE
 * Previously, no separation existed between Containers and Components.
 * Thus, we must export all containers here for old projects.
 */
export {
  Add,
  Detail,
  Header,
  Table,
  Page,
  Search,
  SubDetail,
} from '../containers';

/**
 * Alias names for backwards compatibility.
 */
export { Table as List } from '../containers';
