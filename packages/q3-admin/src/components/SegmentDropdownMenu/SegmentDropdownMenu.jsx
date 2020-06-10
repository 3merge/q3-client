import React from 'react';
import PropTypes from 'prop-types';
import { DropDownMenu } from 'q3-ui/lib/toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from 'q3-ui-dialog';
import { useTranslation } from 'react-i18next';

const renderIconButon = (onClick) => (
  <IconButton onClick={onClick}>
    <MoreVertIcon />
  </IconButton>
);

const SegmentDropdownMenu = ({
  children,
  onFavourite,
  onDelete,
  isDefault,
}) => {
  const { t } = useTranslation();

  const getItems = (open) => {
    const items = [];

    if (onFavourite)
      items.push({
        label: t('labels:markAsDefault'),
        onClick: onFavourite,
      });

    if (!isDefault) {
      if (open)
        items.push({
          label: t('labels:modify'),
          onClick: open,
        });

      items.push({
        label: t('labels:delete'),
        onClick: onDelete,
      });
    }

    return items;
  };

  return (
    <Dialog
      title={t('titles:customSegmentEditor')}
      renderTrigger={(open) => (
        <DropDownMenu
          id="q3-segments"
          variant="selectedMenu"
          items={getItems(open)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {renderIconButon}
        </DropDownMenu>
      )}
      renderContent={() => (
        <Box maxWidth="100%">{children}</Box>
      )}
    />
  );
};

SegmentDropdownMenu.defaultProps = {
  isDefault: false,
};

SegmentDropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  onFavourite: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isDefault: PropTypes.bool,
};

export default SegmentDropdownMenu;
