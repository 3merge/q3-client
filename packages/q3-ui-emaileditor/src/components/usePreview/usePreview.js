import React from 'react';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EmailEditorContext from '../EmailEditorContext';

const usePreview = () => {
  const isMobile =
    useMediaQuery((theme) =>
      theme.breakpoints.down('sm'),
    ) || false;

  const [html, setHtml] = React.useState();
  const { disablePreview, variables } = React.useContext(
    EmailEditorContext,
  );

  const clear = () => setHtml(null);

  const getData = ({ data }) => {
    setHtml(data?.html);
  };

  return {
    render: (mjml) =>
      mjml && !disablePreview && !isMobile
        ? axios
            .post('emails-preview', {
              mjml,
              variables,
            })
            .then(getData)
            .catch(clear)
        : Promise.resolve(clear()),

    html,
  };
};

export default usePreview;
