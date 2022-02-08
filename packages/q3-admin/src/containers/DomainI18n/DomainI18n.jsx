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
import { isObject, size } from 'lodash';
import SystemPageSub from '../../components/SystemPageSub';
import useDomainContext from '../../hooks/useDomainContext';

const DomainI18n = () => {
  const { domain = {}, update } = useDomainContext();
  const { lng, resources, supportedLngs } = domain;
  const { t } = useTranslation();

  const initialValues =
    isObject(resources) && lng in resources
      ? resources[lng]
      : resources || {};

  const renderNamespace = (ns) => {
    if (!isObject(initialValues[ns])) return null;

    return (
      <Accordion variant="outlined" defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{t(`titles:${ns}`)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box width="100%">
            <Builders.Form
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
      {size(supportedLngs) < 1 && (
        <Alert severity="info">
          {t('descriptions:localeEditor', {
            lng,
          })}
        </Alert>
      )}
      {isObject(initialValues)
        ? Object.keys(initialValues).map(renderNamespace)
        : 'N/A'}
    </SystemPageSub>
  );
};

export default DomainI18n;
