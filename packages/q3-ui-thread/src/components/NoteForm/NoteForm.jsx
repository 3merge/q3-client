import React from 'react';
import { castToBoolean } from 'q3-ui-forms/lib/helpers';
import { Builders } from 'q3-ui-forms';
import { compact, map } from 'lodash';
import useNoteTags from '../useNoteTags';

const NoteForm = (props) => {
  const options = useNoteTags();

  return (
    <Builders.Form
      initialValues={{
        title: '',
        message: '',
        tags: [],
        pin: false,
      }}
      {...props}
      restart
      submitLabel="save"
      marshal={{
        message: 'message',
        pin: [castToBoolean],
        tags: [(tags) => compact(map(tags, 'value'))],
        title: 'title',
      }}
    >
      <Builders.Field name="title" xl={12} lg={12} />
      <Builders.Field
        name="tags"
        type="chips"
        freeSolo
        options={options}
        xl={12}
        lg={12}
      />
      <Builders.Field
        name="message"
        xl={12}
        lg={12}
        multiline
        required
        minRows={10}
      />
      <Builders.Field
        name="pin"
        type="checkbox"
        variant="switch"
        xl={12}
        lg={12}
      />
    </Builders.Form>
  );
};

export default NoteForm;
