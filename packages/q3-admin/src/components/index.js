export { default as App } from './app';
export { default as AddNewForm } from './AddNewForm';
export { default as Loader } from './loader';
export { default as Public } from './public';

/**
 * @NOTE
 * Previously, no separation existed between Containers and Components.
 * Thus, we must export all containers here for old projects.
 */
export {
  Detail,
  Table,
  Page,
  SubDetail,
} from '../containers';

/**
 * Alias names for backwards compatibility.
 */
export { Table as List } from '../containers';
