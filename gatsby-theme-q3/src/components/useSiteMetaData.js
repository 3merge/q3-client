import { get, merge } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';
import useRunTime from 'gatsby-theme-q3-mui/src/components/useRunTime';

export default () =>
  merge(
    get(
      useStaticQuery(graphql`
        query {
          site {
            siteMetadata {
              appDirectory
              description
              title
            }
          }
        }
      `),
      'site.siteMetadata',
      {},
    ),
    useRunTime(),
  );
