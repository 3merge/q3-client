import React from 'react';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import Drop from '../Drop';
import File from '../File';

const FilterList = ({ drop, files }) => {
  const { t } = useTranslation();

  const b = groupBy(files, (v) => {
    return v.tag;
  });

  const getTitle = (tag) =>
    tag && String(tag) !== 'undefined'
      ? t(`titles:${tag}`)
      : t('titles:misc');

  const renderFile = (file, i) => (
    <File
      key={i}
      name={file.name}
      url={file.url}
      size={file.size}
    />
  );

  return Object.entries(b).map(([tag, group], i) => (
    <div key={i}>
      <p>{getTitle(tag)}</p>
      {drop.includes(tag) ? (
        <Drop onDrop={() => null}>
          {(pending) =>
            [...pending, ...group].map(renderFile)
          }
        </Drop>
      ) : (
        group.map(renderFile)
      )}
    </div>
  ));
};

export default FilterList;
