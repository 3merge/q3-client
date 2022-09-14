import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { find, size } from 'lodash';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import useSegmentsActive from '../../hooks/useSegmentsActive';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';
import useStyle from './styles';

const CollectionUiSelect = ({ uis }) => {
  const s = useSegmentsActive();
  const { change } = useCollectionUiLocalStorage([]);
  const cls = useStyle();
  const { t } = useTranslation('labels');

  const to =
    find(s.segments, (seg) => seg.label === s.active)
      ?.value || '?';

  const getIcon = (ui) =>
    ({
      calendar: CalendarTodayIcon,
      table: ViewModuleIcon,
    }[ui]);

  const handleChange = (nextUi) => () => {
    change(nextUi);
  };

  return <Button>Change view</Button>;
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
