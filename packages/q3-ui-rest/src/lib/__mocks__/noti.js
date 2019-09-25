export const onSuccess = jest.fn();
export const onFail = jest.fn();

export default () => ({
  onSuccess,
  onFail,
});
