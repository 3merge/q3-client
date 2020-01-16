import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Apps from '@material-ui/icons/AssignmentReturned';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { DropDownMenu } from 'q3-ui/lib/toolbar';
import TableCellHeader from './cellHeader';
import { SelectOne } from './select';
import { hasKeys } from '../utils/helpers';

const Row = ({
  id,
  columns: { name, description, photo, ...etc },
  rowToolbar,
}) => {
  const { t } = useTranslation('labels');

  return (
    <TableRow>
      <TableCellHeader
        name={t(name)}
        sub={t(description)}
        imgSrc={t(photo)}
      />
      {hasKeys(etc)
        ? Object.entries(etc).map(([key, value]) => (
            <TableCell data-title={t(key)}>
              {value}
            </TableCell>
          ))
        : []}
      <TableCell
        style={{
          verticalAlign: 'text-top',
        }}
      >
        <SelectOne id={id} />
        {rowToolbar && rowToolbar.length ? (
          <DropDownMenu
            items={
              typeof rowToolbar === 'function'
                ? rowToolbar({})
                : rowToolbar
            }
          >
            {(open, isOpen) => (
              <Tooltip title={t('menu')}>
                <IconButton
                  style={{ opacity: isOpen ? 1 : null }}
                  onClick={open}
                >
                  <Apps />
                </IconButton>
              </Tooltip>
            )}
          </DropDownMenu>
        ) : null}

        <IconButton
          to={`${id}`}
          component={Link}
          aria-label="View"
        >
          <ArrowForward />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

Row.propTypes = {
  id: PropTypes.string.isRequired,
  rowToolbar: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
  columns: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

Row.defaultProps = {
  rowToolbar: [],
};

export default Row;
