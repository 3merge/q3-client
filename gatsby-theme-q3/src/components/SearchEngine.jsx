import React from 'react';
import { get, isFunction, isObject } from 'lodash';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { browser } from 'q3-ui-helpers';
import useSiteMetaData from './useSiteMetaData';

const withContent = (output) => (content) =>
  content && isFunction(output) ? output(content) : [];

export const getStartUrl = () =>
  browser.isBrowserReady()
    ? get(window, 'location.host')
    : '';

export const generateMetaDescriptionOptions = withContent(
  (content) => [
    {
      name: 'description',
      content,
    },
    {
      property: 'og:description',
      content,
    },
    {
      name: 'twitter:description',
      content,
    },
  ],
);

export const generateMetaTitleOptions = withContent(
  (content) => [
    {
      property: 'og:title',
      content,
    },
    {
      name: 'twitter:title',
      content,
    },
  ],
);

export const generateBrand = (xs) =>
  xs ? `%s | ${xs}` : undefined;

export const generateIcons = (site = {}) =>
  site?.favicon
    ? [
        {
          src: site.favicon,
          sizes: '512x512',
          type: 'image/png',
        },
      ]
    : [];

export const generateManifest = (site = {}) => ({
  background_color: site.color,
  description: site.description,
  display: 'fullscreen',
  icons: generateIcons(site),
  name: site.title,
  start_url: getStartUrl(),
  short_name: site.brand,
  theme_color: site.color,
});

const SEO = ({ description, lang, meta, title }) => {
  const site = useSiteMetaData();
  const metaDescription = description || site.description;
  const metaTitle = title || site.title;
  const manifestData = generateManifest(site);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={generateBrand(site.brand)}
      meta={[
        ...generateMetaTitleOptions(metaTitle),
        ...generateMetaDescriptionOptions(metaDescription),
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
      ].concat(meta)}
    >
      {isObject(manifestData) ? (
        <link
          rel="manifest"
          href={`data:application/manifest+json,${encodeURIComponent(
            JSON.stringify(manifestData),
          )}`}
        />
      ) : null}
      <link rel="icon" href={site.favicon} />
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
  title: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
