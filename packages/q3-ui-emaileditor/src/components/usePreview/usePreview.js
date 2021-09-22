import React from 'react';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EmailEditorContext from '../EmailEditorContext';

const usePreview = () => {
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('sm'),
  );

  const [html, setHtml] = React.useState();
  const { disablePreview, variables } = React.useContext(
    EmailEditorContext,
  );

  return {
    render: (mjml) =>
      mjml && !disablePreview && !isMobile
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
