import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { DropDownMenu } from 'q3-ui/lib/toolbar';

const FiltersCustomAction = ({
  name,
  query,
  isActive,
  onClick,
  onDelete,
}) => {
  const { t } = useTranslation('labels');

  const items = [
    {
      label: t('modify'),
      onClick,
    },
    {
      label: t('remove'),
      onClick: onDelete,
    },
  ];

  return (
    <DropDownMenu items={items}>
      {(open, isOpen) => {
        let color;
        const label = `${name} filter context actions`;

        if (isActive) color = 'secondary';

        const ifOpen = (v) => (isOpen ? v : undefined);

        return (
          <ButtonGroup
            variant="contained"
            aria-label={label}
            color={color}
            style={{
              marginRight: '0.25rem',
              marginBottom: '0.25rem',
            }}
          >
            <Button onClick={() => navigate(query)}>
              {name}
            </Button>
            <Button
              color={color}
              aria-controls={ifOpen(label)}
              aria-expanded={ifOpen('true')}
              aria-label={name}
              aria-haspopup="menu"
              onClick={open}
            >
              <MoreVertIcon />
            </Button>
          </ButtonGroup>
        );
      }}
    </DropDownMenu>
  );
};

FiltersCustomAction.propTypes = {
  name: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FiltersCustomAction;
