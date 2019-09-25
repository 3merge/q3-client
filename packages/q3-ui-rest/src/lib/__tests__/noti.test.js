import { useSnackbar } from 'notistack';
import useNotiFacade from '../noti';

const { enqueueSnackbar } = useSnackbar();

test('useNotiFacade.onSuccess should call success variant', () => {
  useNotiFacade().onSuccess('Foo');
  expect(enqueueSnackbar).toHaveBeenCalledWith('Foo', {
    variant: 'success',
  });
});

test('useNotiFacade.onFail should call error variant', () => {
  useNotiFacade().onFail('Foo');
  expect(enqueueSnackbar).toHaveBeenCalledWith('Foo', {
    variant: 'error',
  });
});
