import React from 'react';
import { withLocation } from 'with-location';
import PropTypes from 'prop-types';
import { url } from 'q3-ui-helpers';
import Form from '../../builders/form';

const getParamName = (v) => {
  const [name] = v.split('*').map(decodeURIComponent);
  return name;
};

const clean = (v) => v.replace(/%20/g, ' ');

const join = (key, value) => {
  if (value.startsWith('=')) return `${key}${value}`;
  if (value.startsWith('~'))
    return `${key}${value.substring(1)}`;

  if (value.startsWith('!~')) {
    return `!${key}${value.substring(2)}`;
  }

  return `${key}=${value}`;
};

export const serialize = (o) =>
  Object.entries(o)
    .reduce((acc, [key, value]) => {
      const normalized = encodeURIComponent(
        Array.isArray(value)
          ? value.join(',')
          : String(value),
      );

      const hasAsterisk = key.includes('*');
      const name = getParamName(key);

      if (hasAsterisk && normalized === 'true') {
        acc.push(name);
      } else if (
        !hasAsterisk &&
        normalized !== 'undefined' &&
        normalized.length
      ) {
        acc.push(join(name, normalized));
      }

      return acc;
    }, [])
    .join('&');

export const deserialize = (v) => {
  if (!v) return {};

  return url
    .removeLeadingQueryCharacter(v)
    .split('&')
    .reduce((acc, next) => {
      // eslint-disable-next-line
      let [key, value] = next ? next.split('=') : [next];

      if (typeof value === 'string') value = clean(value);
      if (value === undefined) value = true;
      if (String(value).includes(','))
        value = value.split(',').map(clean);

      acc[encodeURIComponent(key)] = Array.isArray(value)
        ? value.map(decodeURIComponent)
        : decodeURIComponent(value);
      return acc;
    }, {});
};

export const handleStateEncoding = (onDone) => (
  values,
  actions,
) => {
  onDone(`?${serialize(values)}`);
  actions.setSubmitting(false);
};

export const handleStateDecoding = (values, defaults) => ({
  ...defaults,
  ...deserialize(values),
});

export const handleStateClear = (
  values,
  locationUtils,
) => () => {
  const { params, navigate } = locationUtils;

  Object.keys(values)
    .map(getParamName)
    .forEach((v) => params.delete(v));

  return navigate(params.toString());
};

const EncodedUrl = ({
  children,
  navigate,
  location,
  initialValues,
  query,
  withClear,
  onSave,
  ...props
}) => (
  <Form
    {...props}
    enableSubmit={false}
    onSubmit={handleStateEncoding(onSave || navigate)}
    initialValues={handleStateDecoding(
      // allowed to override with empty string
      query === undefined ? location.search : query,
      initialValues,
    )}
  >
    {children}
  </Form>
);

EncodedUrl.propTypes = {
  children: PropTypes.node.isRequired,
  navigate: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  withClear: PropTypes.bool,
  query: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

EncodedUrl.defaultProps = {
  onSave: null,
  withClear: false,
  query: undefined,
};

/**
 * @NOTE
 * There is some duplication with utilities available through this HOC.
 * Some of this logic is very particular to our implementation, though, so it'll remain separate for now.
 */
export default withLocation(EncodedUrl);
