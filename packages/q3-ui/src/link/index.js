import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

export default withStyles(() => ({
  root: {
    fontSize: '1rem',
    textDecoration: 'underline !important',
  },
}))(Link);

export const Email = ({ address }) => (
  <Link href={`mailTo:${address}`}>{address}</Link>
);

export const Phone = ({ number }) => (
  <Link href={`tel:${number}`}>{number}</Link>
);

export const AddressLink = ({ children }) => {
  const q = React.Children.toArray(children).reduce(
    (acc, next) => {
      if (
        typeof next === 'string' ||
        typeof next === 'number'
      ) {
        const part = next.replace(',', '').trim();
        if (part.length)
          // eslint-disable-next-line
          acc += ` ${next.replace(',', '').trim()}`;
      }

      return acc;
    },
    '',
  );

  return (
    <Link
      href={`http://maps.google.com/maps?q=${q}`}
      rel="noopener"
      target="_blank"
    >
      {children}
    </Link>
  );
};
