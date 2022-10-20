export { default as App } from './app';
export { default as AddNewForm } from './AddNewForm';
export { default as Loader } from './loader';
export { default as Public } from './public';

export { default as Pattern } from './Pattern';
export { default as PatternContainer } from './PatternContainer';
export { default as PatternDataGrid } from './PatternDataGrid';
export { default as PatternFormDialog } from './PatternFormDialog';
export { default as PatternList } from './PatternList';
export { default as PatternMap } from './PatternMap';
export { default as TableVertical } from './TableVertical';

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
