import { useTranslation } from 'q3-ui-locale';
import { useAuth } from 'q3-ui-permissions';
import renderCellActions from '../renderCellActions';
import renderDate from '../renderDate';
import renderDuration from '../renderDuration';
import renderCellPriority from '../renderCellPriority';
import renderCellStatus from '../renderCellStatus';

const useCells = () => {
  const { canDelete, canEdit } = useAuth('queues');
  const { t } = useTranslation('labels');

  const addStateTo = (fn) => (args) =>
    fn({
      ...args,
      injectedState: {
        canDelete,
        canEdit,
        t,
      },
    });

  return {
    renderCellActions: addStateTo(renderCellActions),
    renderCellPriority: addStateTo(renderCellPriority),
    renderCellStatus: addStateTo(renderCellStatus),

    // stateless
    renderDate,
    renderDuration,
  };
};

export default useCells;
