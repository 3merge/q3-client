import React from 'react';
import { storiesOf } from '@storybook/react';
import * as yup from 'yup';
import Container from '@material-ui/core/Container';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Input from '../inputs';
import Repeater from '.';
import Wizard from '../wizard';
import { Delete as Confirmation } from '../dialogs';

storiesOf('Components|Repeater', module)
  .add('With simple array', () => {
    const Simulated = () => {
      const [data, setData] = React.useState([
        {
          id: 1,
          demo: ['Foo', 'Bar'],
        },
      ]);

      const onCreate = (values, actions) =>
        new Promise((resolve) => {
          setTimeout(() => {
            setData(data.concat(values));
            actions.setSubmitting(false);
            actions.resetForm();
            resolve();
          }, 1000);
        });

      const onEdit = (id) => (values, actions) =>
        new Promise((resolve) => {
          setData(
            data.map((item) =>
              item.id === id ? values : item,
            ),
          );
          actions.setSubmitting(false);
          resolve();
        });

      const onDelete = (id) => () =>
        new Promise((resolve) => {
          setData(data.filter((item) => item.id !== id));
          resolve();
        });

      const validation = yup.object().shape({
        id: yup
          .string()
          .required()
          .test(
            'Unique ID',
            'ID taken already',
            (value) =>
              data.findIndex(
                (item) => item.id === parseInt(value, 10),
              ) === -1,
          ),
        demo: yup.string().required(),
      });

      const Form = () => (
        <>
          <Input
            name="id"
            type="number"
            autoFocus
            required
          />
          <Input name="demo" type="text" />
        </>
      );

      return (
        <Container maxWidth="md" style={{ marginTop: 15 }}>
          <Repeater
            subtitle="Ordered by newest"
            description="hi"
            name="contacts"
            primary="demo"
            secondary="id"
            data={data}
            renderPost={() => (
              <Wizard
                icon={Add}
                validationSchema={validation}
                initialValues={{ id: '', demo: '' }}
                onSubmit={onCreate}
                title="Create"
                steps={[Form]}
              />
            )}
            renderRowToolbar={({ id }) => (
              <>
                <Wizard
                  icon={Edit}
                  onSubmit={onEdit(id)}
                  validationSchema={validation}
                  initialValues={{ id: '', demo: '' }}
                  title="Update"
                  steps={[Form]}
                />
                <Confirmation next={onDelete(id)} />
              </>
            )}
          />
        </Container>
      );
    };
    return <Simulated />;
  })
  .add('With loading', () => {
    const Simulated = () => {
      const [loading, setLoading] = React.useState(true);

      React.useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);
      return (
        <Container maxWidth="md">
          <Repeater
            fetching={loading}
            data={[]}
            name="contacts"
          >
            <Input name="demo" type="text" autoFocus />
          </Repeater>
        </Container>
      );
    };
    return <Simulated />;
  })
  .add('With error', () => {
    const Simulated = () => {
      const [loading, setLoading] = React.useState(true);
      const [err, setErr] = React.useState(null);

      React.useEffect(() => {
        setTimeout(() => {
          setLoading(false);
          setErr(true);
        }, 2000);
      }, []);

      return (
        <Container maxWidth="md">
          <Repeater
            fetching={loading}
            fetchingError={err}
            name="contacts"
          >
            <Input name="demo" type="text" autoFocus />
          </Repeater>
        </Container>
      );
    };
    return <Simulated />;
  });
