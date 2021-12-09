import { i18n } from 'q3-ui-locale';
import PropTypes from 'prop-types';

const registeri18ResourceBundles = (contentData) => {
  if (!contentData || !('en' in contentData)) return;

  Object.entries(contentData).forEach(([key, bundle]) => {
    Object.entries(bundle).forEach(([namespace, data]) => {
      i18n.addResourceBundle(
        key,
        namespace,
        data,
        true,
        true,
      );
    });
  });
};

const LocaleBundles = ({ children, locale }) => {
  registeri18ResourceBundles(locale);
  return children;
};

LocaleBundles.defaultProps = {
  children: null,
  locale: {},
};

LocaleBundles.propTypes = {
  // eslint-disable-next-line
  children: PropTypes.any,
  // eslint-disable-next-line
  locale: PropTypes.object,
};

export default LocaleBundles;
