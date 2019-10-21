import React from 'react';
import useRest from 'q3-ui-rest';
import { useTranslation } from 'react-i18next';
import CallToAction from 'q3-ui/callToAction';
import Paper from '@material-ui/core/Paper';
import Timeline, { TimelineSkeleton } from 'q3-ui/timeline';
import ServerError from 'q3-ui/error';
import noNotesImg from '../../images/no-notes.png';

export default ({ id }) => {
  const { t } = useTranslation();
  const { versions, fetching, fetchingError } = useRest({
    key: 'versions',
    runOnInit: true,
    url: `/versions?topic=${id}`,
  });

  if (fetching) return <TimelineSkeleton />;
  if (fetchingError) return <ServerError />;

  if (!versions.length)
    return (
      <Paper>
        <CallToAction
          imgSrc={noNotesImg}
          title={t('titles:noHistory')}
          body={t('descriptions:noHistory')}
        />
      </Paper>
    );

  return <Timeline entries={versions} />;
};
