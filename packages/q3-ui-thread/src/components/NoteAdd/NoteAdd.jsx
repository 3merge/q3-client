import React from 'react';
import Dialog from 'q3-ui-dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'q3-ui-locale';
import AddIcon from '@material-ui/icons/Add';
import NoteForm from '../NoteForm';
import ThreadContext from '../ThreadContext';
import ThreadContextHttp from '../ThreadContextHttp';

const NoteAdd = () => {
  const { post } = React.useContext(ThreadContextHttp);
  const { canCreate } = React.useContext(ThreadContext);
  const { t } = useTranslation('titles');

  const handleSubmit = (next) => (values) =>
    post(values).then(next);

  return canCreate ? (
    <Dialog
      renderContent={(close) => (
        <NoteForm
          restart
          submitLabel="add"
          onSubmit={handleSubmit(close)}
        />
      )}
      renderTrigger={(onClick) => (
        <Box display="inline-block" mr={0.5}>
          <Button
            color="secondary"
            onClick={onClick}
            startIcon={<AddIcon />}
            variant="contained"
          >
            {t('addNote')}
          </Button>
        </Box>
      )}
      variant="drawer"
      title="addNote"
    />
  ) : (
    <div className="empty-space" />
  );
};

export default NoteAdd;
