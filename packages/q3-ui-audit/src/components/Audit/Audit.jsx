import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Button,
  Typography,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useTranslation } from 'q3-ui-locale';
import AuditTemplateSelect from '../AuditTemplateSelect';
import Timeline from '../Timeline';
import withAuditAuth from '../withAuditAuth';
import useAudit from '../useAudit';
import Filters from '../Filters';
import useFields from '../useFields';

const Audit = ({ data, collectionName, templates }) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [filterState, setFilterState] = React.useState({});
  const [showResults, setShowResults] =
    React.useState(false);

  const { t } = useTranslation();
  const fields = useFields(data);
  const timeline = useAudit(
    collectionName,
    data.id,
    filterState,
  );

  const handleBack = () => setShowResults(false);

  const handleChange = (_, newTabIndex) =>
    setTabIndex(newTabIndex);

  const handleSubmit = (values) =>
    new Promise((resolve) => {
      setFilterState(values);
      setShowResults(true);
      resolve();
    });

  return (
    <Box position="relative">
      {showResults ? (
        <Box>
          <Box>
            <Button
              startIcon={<ArrowBackIosIcon />}
              onClick={handleBack}
            >
              {t('labels:back')}
            </Button>
          </Box>
          <Timeline {...timeline} />
        </Box>
      ) : (
        <Box>
          <Typography>
            {t('descriptions:auditLogs')}
          </Typography>
          <Box mb={1}>
            <Tabs value={tabIndex} onChange={handleChange}>
              <Tab
                value={0}
                label={t('labels:auditTemplate')}
              />
              <Tab value={1} label={t('labels:advanced')} />
            </Tabs>
          </Box>
          {tabIndex === 0 ? (
            <AuditTemplateSelect
              initialValues={filterState}
              templates={templates}
              onSubmit={handleSubmit}
            />
          ) : (
            <Filters
              initialValues={filterState}
              fields={fields}
              onSubmit={handleSubmit}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

Audit.defaultProps = {};

Audit.propTypes = {
  collectionName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  // eslint-disable-next-line
  templates: PropTypes.object.isRequired,
};

export default withAuditAuth(Audit);
