import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { browser } from 'q3-ui-helpers';
import useSiteMetaData from './useSiteMetaData';

const getStartUrl = () =>
  browser.isBrowserReady()
    ? get(window, 'location.host')
    : '';

const generateMetaDescriptionOptions = (content) =>
  content
    ? [
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
      ]
    : [];

const generateMetaTitleOptions = (content) =>
  content
    ? [
        {
          property: 'og:title',
          content,
        },
        {
          name: 'twitter:title',
          content,
        },
      ]
    : [];

const SEO = ({ description, lang, meta, title }) => {
  const site = useSiteMetaData();
  const metaDescription = description || site.description;
  const metaTitle = title || site.title;
  const brand = get(site, 'brand', 'Q3');

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      // only template when available
      titleTemplate={brand ? `%s | ${brand}` : undefined}
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
      <link
        rel="manifest"
        href={`data:application/manifest+json,${encodeURIComponent(
          JSON.stringify({
            background_color: site.color,
            description: site.description,
            display: 'fullscreen',
            name: site.title,
            start_url: getStartUrl(),
            short_name: site.brand,
            theme_color: site.color,
            icons: site.favicon
              ? [
                  {
                    src: site.favicon,
                    sizes: '512x512',
                    type: 'image/png',
                  },
                ]
              : [],
          }),
        )}`}
      />
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
