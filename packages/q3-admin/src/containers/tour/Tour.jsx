import React from 'react';
import Tour from 'q3-ui/lib/tour';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { browser } from 'q3-ui-helpers';
import tourDefaults from './tour.json';

const AdminTour = ({ steps, children }) => {
  const { state, update } = React.useContext(AuthContext);
  const tours = get(state, 'profile.tours', []);

  const reloadSession = () => {
    if (browser.isBrowserReady()) window.location.reload();
  };

  const markAsSeen = (latestTours) =>
    update({
      tours: [...tours, ...latestTours],
    }).then(reloadSession);

  const restartTours = () =>
    update({ tours: [] }, reloadSession);

  return (
    <>
      <Tour
        steps={tourDefaults.concat(steps).filter(Boolean)}
        previouslySeen={tours}
        onDone={markAsSeen}
      />
      {children ? children(restartTours) : null}
    </>
  );
};

AdminTour.propTypes = [];
export default AdminTour;
