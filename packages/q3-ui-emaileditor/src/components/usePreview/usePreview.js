import React from 'react';
import axios from 'axios';
import EmailEditorContext from '../EmailEditorContext';

const usePreview = () => {
  const [html, setHtml] = React.useState();
  const { disablePreview, variables } = React.useContext(
    EmailEditorContext,
  );

  return {
    render: (mjml) =>
      mjml && !disablePreview
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
        : Promise.resolve(),

    html,
  };
};

export default usePreview;
