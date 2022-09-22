import useToggleEffect from '../useToggleEffect';

const useToggleWithSegmentState = ({ applied = false }) =>
  useToggleEffect(applied);

export default useToggleWithSegmentState;
