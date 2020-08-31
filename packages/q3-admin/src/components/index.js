export { default as App } from './app';
export { default as Loader } from './loader';
export { default as Main } from './main';
export { default as Public } from './public';
export { default as Header } from './Header';
export { default as SidePanelContent } from './SidePanelContent';

/**
 * @NOTE
 * Previously, no separation existed between Containers and Components.
 * Thus, we must export all containers here for old projects.
 */
export {
  Add,
  Detail,
  Table,
  Page,
  Search,
  SubDetail,
} from '../containers';

/**
 * Alias names for backwards compatibility.
 */
export { Table as List } from '../containers';
