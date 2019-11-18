export default null;

export const useSnackbar = jest.fn().mockReturnValue({
  enqueueSnackbar: jest.fn(),
});
