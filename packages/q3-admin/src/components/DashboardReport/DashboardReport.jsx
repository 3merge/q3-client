import React from 'react';
import Box from '@material-ui/core/Box';
import CloudDownload from '@material-ui/icons/CloudDownload';
import FilterList from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from 'q3-ui/lib/iconButton';
import Typography from '@material-ui/core/Typography';
import { first } from 'lodash';
import { Form } from 'q3-ui-forms/lib/builders';
import Dialog from 'q3-ui-dialog';
import DashboardReportBar from './DashboardReportBar';
import DashboardReportLine from './DashboardReportLine';

const DashboardReport = ({
  children,
  backgroundColor,
  fullWidth,
  title,
  type,
  data,
  ...rest
}) => {
  const renderChart = () => {
    switch (type) {
      case 'Bar':
        return DashboardReportBar;
      case 'Line':
        return DashboardReportLine;
      default:
        return 'div';
    }
  };

  return (
    <Grid item xs={12} lg={fullWidth ? 12 : 6}>
      <Paper
        component="figure"
        elevation={0}
        style={{
          padding: '1rem',
          margin: 0,
          backgroundColor,
        }}
      >
        <Box component="figcaption" px={2} mt={1} mb={-2}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h6" component="span">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Form enableSubmit={false}>
                <Grid item>
                  <Dialog
                    title="filter"
                    renderContent={children}
                    renderTrigger={(onClick) => (
                      <IconButton
                        label="filter"
                        icon={FilterList}
                        buttonProps={{
                          onClick,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    label="download"
                    icon={CloudDownload}
                  />
                </Grid>
              </Form>
            </Grid>
          </Grid>
        </Box>
        <Box height={450}>
          {React.createElement(renderChart(), {
            ...rest,
            keys: Object.keys(first(data)),
            data,
          })}
        </Box>
      </Paper>
    </Grid>
  );
};

export default DashboardReport;
