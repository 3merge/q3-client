import { compact, flatten } from 'lodash';
import useAuthLinks from './useAuthLinks';

export const collapse = (xs) => compact(flatten(xs));

const useDomainLinks = () =>
  collapse([
    useAuthLinks('domain', 'canCreate', [
      {
        text: 'domainBrowserMedia',
        to: 'system/browser',
      },
      {
        text: 'domainManifest',
        to: 'system/manifest',
      },
      {
        text: 'domainPolicies',
        to: 'system/policies',
      },
    ]),
    useAuthLinks(
      'domain',
      'canCreateSub',
      [
        {
          text: 'domainI18n',
          to: 'system/i18n',
        },
      ],
      'resources',
    ),
    useAuthLinks('emails', 'canSee', [
      {
        text: 'domainEmails',
        to: 'system/emails',
      },
    ]),
    useAuthLinks('queues', 'canSee', [
      {
        text: 'domainQueues',
        to: 'system/queues',
      },
    ]),
  ]);

export default useDomainLinks;
