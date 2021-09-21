import React from 'react';
import axios from 'axios';
import EmailEditorContext from '../EmailEditorContext';

const useCodeMirror = () => {
  const [html, setHtml] = React.useState();
  const { disablePreview, variables } = React.useContext(
    EmailEditorContext,
  );

  const render = (mjml) =>
    mjml || disablePreview
      ? axios
          .post('emails-preview', {
            mjml,
            variables,
          })
          .then(({ data }) => {
            setHtml(data?.html);
          })
          .catch(() => {
            // noop
          })
      : Promise.resolve();

  return {
    html,
    render,
  };
};

export default useCodeMirror;
