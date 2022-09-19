import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { get, size } from 'lodash';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import { useSegmentsAppliedByCollection } from 'q3-ui-navbar';
import { Definitions } from '../../containers/state';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';
import useStyle from './styles';

const CollectionUiSelect = ({ uis }) => {
  const { collectionName } = React.useContext(Definitions);
  const { change } = useCollectionUiLocalStorage([]);
  const cls = useStyle();
  const { t } = useTranslation('labels');

  const to = get(
    useSegmentsAppliedByCollection(collectionName),
    'value',
    '?',
  );

  const getIcon = (ui) =>
    ({
      calendar: CalendarTodayIcon,
      table: ViewModuleIcon,
    }[ui]);

  const handleChange = (nextUi) => () => {
    change(nextUi);
  };

  return (
    size(uis) > 1 && (
      <ButtonGroup
        aria-label="ui select"
        className={cls.group}
        disableElevation
      >
        {size(uis) > 0 &&
          uis.map((ui) => {
            const Icon =
              ui.icon ||
              getIcon(ui.label) ||
              BrokenImageIcon;

            return (
              <Button
                aria-label={t(ui.label)}
                className={cls.button}
                component={Link}
                key={ui.label}
                data-on={ui.selected}
                onClick={handleChange(ui.label)}
                startIcon={<Icon />}
                to={to}
              >
                {t(ui.label)}
              </Button>
            );
          })}
      </ButtonGroup>
    )
  );
};

CollectionUiSelect.defaultProps = {
  uis: [],
};

CollectionUiSelect.propTypes = {
  uis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default CollectionUiSelect;
