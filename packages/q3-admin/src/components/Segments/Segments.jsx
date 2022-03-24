import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ButtonWithIcon from '../ButtonWithIcon';
import DropdownMenu from '../DropdownMenu';
import { Definitions } from '../../containers/state';
import { useSegmentsFromCollection } from '../../hooks';

const Segments = () => {
  const { canCreateSub } = useAuth('profile');
  const items = useSegmentsFromCollection(
    React.useContext(Definitions).collectionName,
  );

  const shouldRender = canCreateSub('filters');

  return React.useMemo(
    () =>
      shouldRender ? (
        <DropdownMenu items={items}>
          {(onClick) => (
            <ButtonWithIcon
              icon={AccountTreeIcon}
              label="segmentsSettings"
              onClick={onClick}
            />
          )}
        </DropdownMenu>
      ) : null,
    [shouldRender, items],
  );
};

export default React.memo(Segments);
