import { object } from 'q3-ui-helpers';

export const handleSubmit = (onSubmit, onSuccess) => () =>
  object.noop(onSubmit().then(onSuccess));

export const matchAgainstUppercase = (a) => (b) => a === b;
