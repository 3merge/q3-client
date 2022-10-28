import React from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { Builders } from 'q3-ui-forms';
import FieldGroup from 'q3-ui-forms/lib/presets/FieldGroup';
import {
  isObject,
  sortBy,
  groupBy,
  map,
  merge,
  get,
  size,
} from 'lodash';
import { Container } from '@material-ui/core';
import flat from 'flat';
import { object } from 'q3-ui-helpers';
// eslint-disable-next-line
import Asset from 'q3-ui-assets';
import useDomainContext from '../../hooks/useDomainContext';
import SystemPageSub from '../../components/SystemPageSub';
import DomainI18nSearch from '../DomainI18nSearch';

const DomainI18n = () => {
  const { domain = {}, update } = useDomainContext();
  const { t } = useTranslation();
  const { resources = {} } = domain;

  const flattenResourcesWith = (fn) =>
    isObject(resources)
      ? Object.entries(flat(resources)).reduce(
          (acc, curr) => {
            const [key, value] = curr;
            if (fn(key) || fn(value)) acc[key] = value;
            return acc;
          },
          {},
        )
      : {};

  const groupByFlattenedResources = (xs) =>
    groupBy(Object.entries(xs), ([k]) => k.split('.')[0]);

  const isMultiLine = (str) =>
    ['descriptions', 'helpers'].includes(str);

  const mergeData = React.useCallback(
    (values) =>
      update({
        resources: merge({}, resources, values),
      }).then((resp) => {
        // eslint-disable-next-line
        alert(t('descriptions:localeEditorChangeEffect'));
        return resp;
      }),
    [resources],
  );

  const sortByValueIndex = (xs) => sortBy(xs, ([, v]) => v);

  const renderForm = React.useCallback(
    (doesMatch, searchValue) => {
      const data = flattenResourcesWith(doesMatch);
      const ns = groupByFlattenedResources(data);
      const text = size(searchValue)
        ? 'noResults'
        : 'searchLocale';

      const fieldGroups = [
        'titles',
        'labels',
        'descriptions',
        'helpers',
      ].reduce((acc, targetNs) => {
        const fieldData = get(ns, targetNs);
        if (object.hasKeys(fieldData))
          acc.push(
            <FieldGroup
              key={targetNs}
              label={targetNs}
              description={targetNs}
            >
              {map(
                sortByValueIndex(fieldData),
                ([fieldName]) => (
                  <Builders.Field
                    multiline={isMultiLine(fieldName)}
                    name={fieldName}
                    helper={`"${fieldName}"`}
                    key={fieldName}
                    lg={12}
                    rows={3}
                    suppressLabel
                    type="text"
                    xl={12}
                  />
                ),
              )}
            </FieldGroup>,
          );

        return acc;
      }, []);

      return fieldGroups.length ? (
        <Box mt={2}>
          <Builders.Form
            collectionName="domain"
            enableSubmit={false}
            initialValues={data}
            isNew
            onSubmit={mergeData}
            showSuccessMessage
            submitLabel="save"
          >
            {fieldGroups}
            <Container style={{ textAlign: 'right' }}>
              <Builders.Next submit label="save" />
            </Container>
          </Builders.Form>
        </Box>
      ) : (
        <Asset
          icon="Text"
          title={text}
          description={text}
        />
      );
    },
    [resources],
  );

  return (
    <SystemPageSub maxWidth="xl" title="domainI18n">
      <DomainI18nSearch>{renderForm}</DomainI18nSearch>
    </SystemPageSub>
  );
};

export default DomainI18n;
