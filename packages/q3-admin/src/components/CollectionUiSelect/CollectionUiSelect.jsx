import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { get, size } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useSegmentsAppliedByCollection } from 'q3-ui-navbar';
import Tabs from '../Tabs';
import Tab from '../Tab';
import { Definitions } from '../../containers/state';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';

const CollectionUiSelect = ({
  defaultSegmentValue,
  uis,
}) => {
  const { collectionName } = React.useContext(Definitions);
  const { change } = useCollectionUiLocalStorage([]);
  const { t } = useTranslation('labels');

  const to = get(
    useSegmentsAppliedByCollection(collectionName),
    'value',
    defaultSegmentValue,
  );

  const handleChange = (nextUi) => () => {
    change(nextUi);
  };

  return (
    size(uis) > 1 && (
      <Tabs
        aria-label="ui select"
        value={uis.find((item) => item.selected)?.label}
      >
        {size(uis) > 0 &&
          uis.map((ui) => (
            <Tab
              label={t(ui.label)}
              component={Link}
              key={ui.label}
              onClick={handleChange(ui.label)}
              to={to}
              value={ui.label}
            />
          ))}
      </Tabs>
    )
  );
};

CollectionUiSelect.defaultProps = {
  defaultSegmentValue: '?',
  uis: [],
};

CollectionUiSelect.propTypes = {
  defaultSegmentValue: PropTypes.string,
  uis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default CollectionUiSelect;
