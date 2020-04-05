/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const reduceChildren = (C) =>
  React.Children.toArray(C).reduce((acc, next) => {
    if (
      typeof next === 'string' ||
      typeof next === 'number'
    ) {
      const part = next.replace(',', '').trim();
      if (part.length)
        acc += ` ${next.replace(',', '').trim()}`;
    } else if (typeof next === 'object') {
      acc += reduceChildren(get(next, 'props.children'));
    }

    return acc;
  }, '');

export default withStyles(() => ({
  root: {
    fontSize: '1rem',
    textDecoration: 'underline !important',
  },
}))(Link);

export const Email = ({ address }) => (
  <Link href={`mailTo:${address}`}>{address}</Link>
);

Email.propTypes = {
  address: PropTypes.string.isRequired,
};

export const Phone = ({ number }) => (
  <Link href={`tel:${number}`}>{number}</Link>
);

Phone.propTypes = {
  number: PropTypes.string.isRequired,
};

export const AddressLink = ({ children }) => {
  const q = reduceChildren(children);

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

AddressLink.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};
