import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { browser } from 'q3-ui-helpers';
import useStyle from './styles';

const CodeEditorPreview = ({ disable, loading, html }) => {
  const ref = React.useRef();
  const cls = useStyle({
    loading,
  });

  React.useEffect(() => {
    if (ref.current && html && browser.isBrowserReady()) {
      const doc = ref.current.contentWindow.document;

      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html]);

  return disable ? null : (
    <Grid item md={6} xs={12} className={cls.root}>
      <iframe
        ref={ref}
        title="preview"
        className={cls.iframe}
      />
    </Grid>
  );
};

CodeEditorPreview.defaultProps = {
  disable: false,
  loading: false,
  html: undefined,
};

CodeEditorPreview.propTypes = {
  disable: PropTypes.bool,
  loading: PropTypes.bool,
  html: PropTypes.string,
};

export default CodeEditorPreview;
