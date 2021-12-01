import { useTranslation } from 'q3-ui-locale';
import { useAuth } from 'q3-ui-permissions';
import renderCellActions from '../renderCellActions';
import renderCellPriority from '../renderCellPriority';
import renderCellStatus from '../renderCellStatus';

const useCells = () => {
  const disabled = !useAuth('queues')?.canEdit;
  const { t } = useTranslation('labels');

  const addStateTo = (fn) => (args) =>
    fn({
      ...args,
      injectedState: {
        disabled,
        t,
      },
    });

  return {
    renderCellActions: addStateTo(renderCellActions),
    renderCellPriority: addStateTo(renderCellPriority),
    renderCellStatus: addStateTo(renderCellStatus),
  };
};

export default useCells;
