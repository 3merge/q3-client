import React from 'react';
import Dialog from 'q3-ui-dialog';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import { getFileType, toMbs } from '../utils';
import DialogTriggerButton from '../DialogTriggerButton';
import useDialog from '../useDialog';

const DialogAbout = () => {
  const { t } = useTranslation('labels');
  const id = 'q3-file-dialog-about';

  const {
    close,
    data,
    handleOpen,
    isOpen,
    TransitionProps,
  } = useDialog(id);

  const ButtonComponent = React.useCallback(
    (onClick) => (
      <DialogTriggerButton
        id={id}
        onClick={(e) => {
          handleOpen(e, onClick);
        }}
      />
    ),
    [id],
  );

  return (
    <Dialog
      onClose={close}
      isOpen={isOpen}
      renderContent={() => {
        const { size, updatedAt, url } = data || {};

        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th">
                  {t('property')}
                </TableCell>
                <TableCell component="th">
                  {t('description')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{t('size')}</TableCell>
                <TableCell>{toMbs(size)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('type')}</TableCell>
                <TableCell>
                  {url ? getFileType(url) : 'N/A'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('updatedAt')}</TableCell>
                <TableCell>
                  {string.toDate(updatedAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      }}
      renderTrigger={ButtonComponent}
      title={data?.name}
      TransitionProps={TransitionProps}
    />
  );
};

export default React.memo(DialogAbout);
