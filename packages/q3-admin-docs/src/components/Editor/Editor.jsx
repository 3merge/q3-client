import React from 'react';
import { Builders } from 'q3-ui-forms';

const Editor = ({ onSubmit, ...props }) => {
  return (
    <Builders.Form
      onSubmit={onSubmit}
      initialValues={props}
      keep={['title', 'location', 'multitext', 'content']}
    >
      <Builders.Field
        xl={12}
        lg={12}
        type="text"
        name="title"
        required
      />
      <Builders.Field
        xl={12}
        lg={12}
        type="string"
        name="location"
      />
      <Builders.Field
        xl={12}
        lg={12}
        type="multitext"
        name="keyTerms"
      />
      <Builders.Field
        xl={12}
        lg={12}
        type="editor"
        name="content"
        required
      />
    </Builders.Form>
  );
};

export default Editor;
