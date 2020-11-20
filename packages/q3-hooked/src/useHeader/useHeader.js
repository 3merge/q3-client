import React from 'react';
import { useTranslation } from 'react-i18next';
import { getMeta } from 'q3-ui/lib/timeline';
import { Definitions, Store } from '../context';

export const useHeader = () => {
  const { t } = useTranslation('titles');
  const { data } = React.useContext(Store);
  const { collectionName } = React.useContext(Definitions);

  //  const { can } = useAppContext(props);

  const getAuthorship = getMeta('createdBy', 'createdAt');
  const getLastModification = getMeta(
    'lastModifiedBy',
    'updatedAt',
  );

  const createdBy = getAuthorship(data);
  const updatedBy = getLastModification(data);
  const title = t(`${collectionName}.title`, data);
  const namespace = `${collectionName}.description`;
  let description = t(namespace, data);

  if (description === namespace) description = undefined;

  return {
    photo: data.photo,
    title,
    description,
    createdBy,
    updatedBy,
  };
};

export default useHeader;
