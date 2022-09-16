import { useToggle } from 'useful-state';

const useToggleWithSegmentState = (segment) =>
  useToggle(segment?.applied);

export default useToggleWithSegmentState;
