import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import Dialog from 'q3-ui-dialog';
import { string } from 'q3-ui-helpers';
import { connect } from '../../../src/containers';
import { TableVertical } from '../../../src/components';
import PatternMap from '../../../src/components/PatternMap';
import PatternDataGrid from '../../../src/components/PatternDataGrid';
import PatternList from '../../../src/components/PatternList';

const PageWidget = ({ action, children, title }) => (
  <Grid item md={6} xs={12}>
    <Paper
      elevation={0}
      style={{
        borderColor: 'rgb(244, 244, 244)',
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography color="secondary" variant="overline">
          {title}
        </Typography>
        <Box>{action}</Box>
      </Box>
      {children}
    </Paper>
  </Grid>
);

const PagePatternEditableTable = ({
  columns,
  title,
  formProps,
}) => (
  <PageWidget
    action={
      <Dialog
        renderContent={() => (
          <Form
            {...formProps}
            initialValues={{}}
            onSubmit={() => null}
          >
            {columns.map(({ field, label, type }) =>
              type ? (
                <Field
                  name={field}
                  label={label}
                  type={type}
                  xl={12}
                  lg={12}
                />
              ) : null,
            )}
          </Form>
        )}
        renderTrigger={(onClick) => (
          <Button onClick={onClick}>edit</Button>
        )}
        title={title}
      />
    }
    title={title}
  >
    <TableVertical columns={columns} variant="plain" />
  </PageWidget>
);

export default connect(() => (
  <Grid container spacing={2}>
    {/* <Grid item xs={12}>
      Some sort of chart?
    </Grid>
    <Grid item xs={12} md={12}>
     <PagePatternEditableTable
      formProps={{}}
      columns={[
        {
          field: 'name',
          type: 'text',
        },
        {
          field: 'createdAt',
          formatter: 'datetime',
          type: 'time',
        },
        {
          label: 'Movies',
          field: 'movies',
          formatter: 'count',
        },
        {
          label: 'Box Office',
          field: 'boxOffice',
          formatter: 'price',
          type: 'number',
        },
      ]}
      title="Bio"
    />
    </Grid> */}

    <PatternMap
      address={{
        name: '3merge',
        streetNumber: 104,
        streetLine1: 'Crockford Blvd',
        streetLine2: 'Suite 211',
        city: 'Scarborough',
        region: 'ON',
        country: 'CA',
        postal: 'M1R 3C3',
      }}
    />
    <PatternList
      apiParams={() => ({
        key: 'show',
        pluralized: 'shows',
        url: '/shows',
      })}
      renderListItem={({ id, name, boxOffice }) => ({
        title: name,
        description: string.toPrice(boxOffice),
        href: `/shows/${id}`,
      })}
      title="Related"
    />
    <PatternDataGrid
      title="Recent appearances"
      report="appearances"
    />
  </Grid>
));
