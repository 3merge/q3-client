import { useSnackbar } from 'notistack';

const useNotiFacade = () => {
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

export default useNotiFacade;
