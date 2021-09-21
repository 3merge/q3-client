import React from 'react';
import { Grid } from '@material-ui/core';
import useStyle from './styles';

const CodeEditorPreview = ({ disable, loading, html }) => {
  const ref = React.useRef();
  const cls = useStyle({
    loading,
  });

  React.useEffect(() => {
    if (ref.current && html) {
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

export default CodeEditorPreview;
