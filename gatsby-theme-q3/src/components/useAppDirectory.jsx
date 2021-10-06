import { get } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';

export default () =>
  get(
    useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            appDirectory
          }
        }
      }
    `),
    'site.siteMetadata.appDirectory',
    '/',
  );
