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
import { isObject } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { getFileType, toMbs } from '../utils';
import DialogTriggerButton from '../DialogTriggerButton';
import useDialog from '../useDialog';
import useStyle from './styles';

const DialogAbout = () => {
  const id = 'q3-file-dialog-about';
  const { t } = useTranslation('labels');
  const cls = useStyle();

  const {
    close,
    data = {},
    handleOpen,
    isOpen,
    TransitionProps,
  } = useDialog(id);

  const ButtonComponent = React.useCallback(
    (onClick) => (
      <DialogTriggerButton
        id={id}
        onClick={(e) => handleOpen(e, onClick)}
      />
    ),
    [id],
  );

  return (
    <Dialog
      onClose={close}
      isOpen={isOpen}
      renderContent={() => {
        if (!isObject(data)) return null;
        const { size, updatedAt, url } = data;

        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className={cls.cell}
                  component="th"
                >
                  {t('property')}
                </TableCell>
                <TableCell
                  className={cls.cell}
                  component="th"
                >
                  {t('description')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={cls.cell}>
                  {t('size')}
                </TableCell>
                <TableCell className={cls.cell}>
                  {toMbs(size)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={cls.cell}>
                  {t('type')}
                </TableCell>
                <TableCell className={cls.cell}>
                  {url ? getFileType(url) : 'N/A'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={cls.cell}>
                  {t('updatedAt')}
                </TableCell>
                <TableCell className={cls.cell}>
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
