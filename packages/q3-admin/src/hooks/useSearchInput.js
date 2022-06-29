import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import { useValue } from 'useful-state';
import { compact, size } from 'lodash';
import { useQueryParams } from 'q3-ui-queryparams';
import { Definitions } from '../containers/state';

export const handleEnter = (fn) => (e) => {
  const val = e.target.value;

  if (
    !['Enter', 'NumpadEnter'].includes(e?.code) &&
    e?.key !== 'Enter'
  )
    return;

  fn(val);
};

export const useLocationSearchValue = () => {
  const qp = useQueryParams();
  const {
    page,
    search = '',
    ...etc
  } = qp.decode(useLocation()?.search);

  return {
    value: search,

    set(val) {
      if (val) etc.search = val;
      return qp.encode(etc);
    },
  };
};

export default () => {
  const inputRef = React.useRef();
  const navigate = useNavigate();
  const { t } = useTranslation('labels');

  const { value: currentSearchValue, set: setSearchValue } =
    useLocationSearchValue();

  const { value, onChange, setValue } = useValue(
    currentSearchValue,
  );

  const handleReset = () => {
    setValue('');
    inputRef.current.focus();
  };

  const { collectionName, directoryPath } =
    React.useContext(Definitions);

  const combineWithDirectoryPath = (xs) =>
    compact([directoryPath, xs]).join('');

  React.useEffect(() => {
    if (currentSearchValue !== value)
      setValue(currentSearchValue);
  }, [
    Array.isArray(currentSearchValue)
      ? currentSearchValue.join('')
      : currentSearchValue,
  ]);

  return {
    'aria-label': 'search',
    value,
    onChange,
    handleReset,
    placeholder: t(
      collectionName
        ? `${collectionName}SearchPlaceholder`
        : 'searchPlaceholder',
    ),
    fullWidth: true,
    onKeyPress: handleEnter((xs) =>
      navigate(
        combineWithDirectoryPath(setSearchValue(xs)),
      ),
    ),
    type: 'text',
    inputRef,
    inEffect: size(currentSearchValue) > 0,
  };
};
