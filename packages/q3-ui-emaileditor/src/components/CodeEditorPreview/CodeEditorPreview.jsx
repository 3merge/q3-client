import React from 'react';
import { Grid } from '@material-ui/core';

const CodeEditorPreview = ({ disable, loading, html }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current && html) {
      const doc = ref.current.contentWindow.document;

      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [html]);

  return disable ? null : (
    <Grid item md={6} xs={12}>
      <iframe
        ref={ref}
        title="preview"
        style={{
          border: 0,
          width: '100%',
          height: '100%',
          filter: loading ? 'blur(2px)' : undefined,
          transition: 'filter 200ms',
        }}
      />
    </Grid>
  );
};

export default CodeEditorPreview;
