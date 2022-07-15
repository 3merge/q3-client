import React from 'react';
import Dialog from 'q3-ui-dialog';
import { castToBoolean } from 'q3-ui-forms/lib/helpers';
import { Builders } from 'q3-ui-forms';
import { compact, map } from 'lodash';
import { getAllTags } from '../Tags/Tags';

const NoteForm = ({ data, onSubmit }) => (
  <Dialog
    renderContent={(close) => (
      <Builders.Form
        initialValues={{
          title: '',
          message: '',
          tags: [],
          color: '',
          pin: false,
        }}
        restart
        submitLabel="save"
        onSubmit={(values) => onSubmit(values).then(close)}
        marshalSelectively
        marshal={{
          pin: [castToBoolean],
          tags: [
            (tags) => compact(map(tags, 'value')).sort(),
          ],
        }}
      >
        <Builders.Field name="title" xl={12} lg={12} />
        <Builders.Field
          name="tags"
          type="chips"
          freeSolo
          options={getAllTags(data)}
          xl={12}
          lg={12}
        />
        <Builders.Field
          name="color"
          type="color"
          xl={12}
          lg={12}
        />
        <Builders.Field
          name="message"
          xl={12}
          lg={12}
          multiline
          rows={10}
        />
        <Builders.Field
          name="pin"
          type="checkbox"
          xl={12}
          lg={12}
        />
      </Builders.Form>
    )}
    renderTrigger={(onClick) => <p onClick={onClick}>s</p>}
  />
);

export default NoteForm;
