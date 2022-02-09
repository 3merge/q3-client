import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'q3-ui-locale';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Builders } from 'q3-ui-forms';
import { isObject } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import SystemPageSub from '../../components/SystemPageSub';
import useDomainContext from '../../hooks/useDomainContext';

const DomainI18n = () => {
  const { domain = {}, update } = useDomainContext();
  const { lng, resources, supportedLngs } = domain;
  const { t } = useTranslation();
  const { HideByField } = useAuth('domain');
  const hasMultipleLanguages = Array.isArray(supportedLngs)
    ? supportedLngs.length && supportedLngs.length > 1
    : false;

  const initialValues = isObject(resources)
    ? resources[lng]
    : resources || {};

  const renderNamespace = (ns) => {
    if (!isObject(initialValues[ns])) return null;

    return (
      <Accordion
        key={ns}
        variant="outlined"
        defaultExpanded={false}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t(`titles:${ns}`)}</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            maxHeight: 450,
            overflowY: 'scroll',
            minWidth: '100%',
            flex: 1,
            width: '100%',
          }}
        >
          <Box width="100%">
            <Builders.Form
              submitLabel="save"
              initialValues={initialValues[ns]}
              onSubmit={(values) =>
                update({
                  resources: {
                    [ns]: values,
                  },
                })
              }
            >
              {Object.keys(initialValues[ns]).map((k) => (
                <Builders.Field
                  multiline={[
                    'descriptions',
                    'helpers',
                  ].includes(ns)}
                  rows={3}
                  name={k}
                  label={k}
                  key={k}
                  xl={12}
                  lg={12}
                />
              ))}
            </Builders.Form>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <SystemPageSub maxWidth="xl" title="domainI18n">
      <HideByField op="Create" path="resources">
        <Alert severity="info">
          {t('descriptions:localeEditorChangeEffect')}
        </Alert>
        {hasMultipleLanguages && (
          <Box mt={1}>
            <Alert severity="info">
              {t('descriptions:localeEditor', {
                lng,
              })}
            </Alert>
          </Box>
        )}
        <Box mt={1}>
          {isObject(initialValues)
            ? Object.keys(initialValues).map(
                renderNamespace,
              )
            : null}
        </Box>
      </HideByField>
    </SystemPageSub>
  );
};

export default DomainI18n;
