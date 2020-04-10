import React from 'react';
import PropTypes from 'prop-types';
import Tabs from 'q3-ui/lib/tabs';
import { Definitions } from '../state';
import Sidebar from '../../components/sidebar';
import Section from '../../components/section';
import Notes from '../notes';
import Documentation from '../documentation';
import History from '../history';
import PictureUpload from '../../components/picture';
import Trash from '../trash';
import Upload from '../upload';
import { mapToNestedRoute } from './helpers';

const TrashPreset = {
  to: '/trash',
  label: 'trash',
  component: () =>
    React.createElement(Trash, {
      name: 'trash',
    }),
};

const Detail = ({
  history,
  filepath,
  children,
  notes,
  picture,
  files,
  ...rest
}) => {
  const { exclusions, rootPath } = React.useContext(
    Definitions,
  );

  const filterByExclusion = (item) =>
    !exclusions.includes(item.label);

  return (
    <Section
      renderOutside={
        <Sidebar
          {...rest}
          commentTab={notes && <Notes />}
          historyTab={history && <History />}
          filesTab={files && <Upload />}
          documentationTab={
            filepath && (
              <Documentation filepath={filepath} />
            )
          }
        >
          {picture && <PictureUpload />}
        </Sidebar>
      }
      renderInside={
        <Tabs
          root={rootPath}
          views={mapToNestedRoute(children)
            .concat([TrashPreset])
            .filter(filterByExclusion)}
        />
      }
    />
  );
};

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,

  /**
   * Will auto-append docmentation to sidebar.
   */
  filepath: PropTypes.shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,

  /**
   * Will auto-append comments to sidebar.
   */
  notes: PropTypes.bool,

  /**
   * Will auto-append history tab.
   */
  history: PropTypes.bool,

  /**
   * Will auto-append featured image.
   */
  picture: PropTypes.bool,
};

Detail.defaultProps = {
  notes: false,
  history: false,
  picture: false,
};

export default React.memo(Detail);

/**



  /*
 console.log('rerender');
  const data = get(state, resourceNameSingular, {});

  const authorization = useAuth(
    collectionName,
    getCreatedBy(data),
  );
*/

/*
  if (trash && authorization.canDelete)
    tabs.push({
      to: '/trash',
      label: 'trash',
      component: () => (
        <Trash
          url={`/${resourceName}`}
          onClick={state.remove()}
        />
      ),
    });
 

 
        renderSidebar={() => (
          <Sidebar
            {...rest}
            state={state}
            createdBy={getAuthor(data)}
            lastUpdated={get(data, 'updatedAt')}
            documentationTab={
              filepath && (
                <Documentation filepath={filepath} />
              )
            }
            commentTab={
              notes && (
                <Notes
                  id={id}
                  collectionName={collectionName}
                />
              )
            }
            historyTab={
              history && (
                <History
                  id={id}
                  collectionName={collectionName}
                />
              )
            }
          >
            {picture && (
              <PictureUpload
                url={`/${collectionName}/${id}`}
                photo={data.photo}
              />
            )}
          </Sidebar>
        )} 

 */
