import { useSnackbar } from 'notistack';

export default () => {
  const { enqueueSnackbar } = useSnackbar();
  return {
    onSuccess(msg) {
      enqueueSnackbar(msg, {
        variant: 'success',
      });
    },
    onFail(msg) {
      enqueueSnackbar(msg, {
        variant: 'error',
      });
    },
  };
};
