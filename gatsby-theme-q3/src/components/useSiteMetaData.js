import { get, merge, isObject, isNil } from 'lodash';
import { useStaticQuery, graphql } from 'gatsby';
import useRunTime from 'gatsby-theme-q3-mui/src/components/useRunTime';

export default (defaultValues = {}) => {
  const output = merge(
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

  if (isObject(output) && isObject(defaultValues))
    Object.entries(defaultValues).forEach(
      ([key, value]) => {
        if (isNil(output[key])) {
          output[key] = value;
        }
      },
    );

  return output;
};
