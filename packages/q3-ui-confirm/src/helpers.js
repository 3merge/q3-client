export const handleSubmit = (onSubmit, onSuccess) => () =>
  onSubmit().then(onSuccess);

export const matchAgainstUppercase = (a) => (b) => a === b;
