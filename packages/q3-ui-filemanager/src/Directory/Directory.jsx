import React from 'react';
import { compact, get, omit, last, reduce } from 'lodash';
import { map } from 'lodash';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { useTranslation } from 'q3-ui-locale';
import useDropZoneAcceptedFiles from '../useDropZoneAcceptedFiles';
import useUploadsDirectories from '../useUploadsDirectories';
import DirectoryBreadcrumbs from '../DirectoryBreadcrumbs';
import DirectoryPendingFiles from '../DirectoryPendingFiles';
import DirectorySort from '../DirectorySort';
import DirectoryView from '../DirectoryView';
import DropZoneWrapper from '../DropZoneWrapper';
import DropZoneInputWrapper from '../DropZoneInputWrapper';
import { makePrivateKey } from '../utils';
import DocumentViewer from '../DocumentViewer';

const maxUpdatedAtContents = (contents = []) =>
  Math.max(
    ...map(
      compact(map(contents, 'updatedAt')),
      (value) => new Date(value),
    ),
  );

const sumContents = (contents = []) =>
  reduce(
    contents,
    (acc, curr) => {
      const n = Number(curr.size);
      return acc + Number.isNaN(n) ? 0 : n;
    },
    0,
  );

const Directory = () => {
  const directories = useUploadsDirectories();
  const [view, setViewer] = React.useState();
  const [current, setCurrentState] = React.useState(null);
  const { t } = useTranslation('labels');

  const joinWithCurrentState = (nextState) =>
    setCurrentState(
      compact([current]).concat(nextState).join('.'),
    );

  const addFolder = () => {
    // eslint-disable-next-line
    const name = prompt('Name');

    if (name.includes('.')) {
      alert('Cannot contain punctionation');
      return;
    }

    if (name) {
      joinWithCurrentState(name);
    }
  };

  const setCurrent = React.useCallback(
    joinWithCurrentState,
    [current],
  );

  const makeClickHandler = (func, nextValue) => (e) => {
    e.preventDefault();
    func(nextValue);
  };

  const state = React.useMemo(() => {
    const folderId = makePrivateKey(
      current ? last(current.split('.')) : null,
    );

    const a = current
      ? get(directories, current, {})
      : directories;

    return {
      files: map(get(a, folderId, []), (file) => ({
        ...file,
        onClick: makeClickHandler(setViewer, file),
      })),
      siblings: Object.entries(omit(a, [folderId])).map(
        ([key, value]) => {
          const contents = get(
            value,
            makePrivateKey(key),
            [],
          );

          return {
            name: key,
            size: sumContents(contents),
            updatedAt: maxUpdatedAtContents(contents),
            onClick: makeClickHandler(setCurrent, key),
          };
        },
      ),
    };
  }, [directories, current]);

  const { onDrop, pending } =
    useDropZoneAcceptedFiles(current);

  return (
    <>
      <DocumentViewer {...view} />
      <DirectorySort {...state}>
        {(
          { files = [], siblings = [] },
          SortingComponent,
        ) => (
          <DirectoryView>
            {(Component, SwitcherComponent) => (
              <>
                <DropZoneWrapper onDrop={onDrop} />
                <DirectoryBreadcrumbs
                  current={current}
                  setCurrent={setCurrentState}
                />
                <Container>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Button
                        color="secondary"
                        startIcon={<CreateNewFolderIcon />}
                        onClick={addFolder}
                        variant="contained"
                      >
                        {t('newFolder')}
                      </Button>
                      <DropZoneInputWrapper
                        onDrop={onDrop}
                      />
                    </Box>
                    <Box alignItems="center" display="flex">
                      <DirectoryPendingFiles
                        pending={pending}
                      />
                      <SortingComponent />
                      <SwitcherComponent />
                    </Box>
                  </Box>
                  <Box py={2}>
                    <Divider />
                  </Box>
                </Container>
                <Component
                  files={files}
                  siblings={siblings}
                />
              </>
            )}
          </DirectoryView>
        )}
      </DirectorySort>
    </>
  );
};

export default Directory;
