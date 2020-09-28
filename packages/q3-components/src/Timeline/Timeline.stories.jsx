import React from 'react';
import Timeline from './Timeline';

export default {
  title: 'Components/Timeline',
};

export const Populated = () => (
  <Timeline
    entries={[
      {
        ref: '5eca9347f0046b20503a39e7',
        modifiedOn: '2020-05-24T15:31:20.187Z',
        target: 'friends',
        op: 'Delete',
        modified: {
          'friends%2E0%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
          'friends%2E1%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
        },
        modifiedBy: {
          id: '5eca9347f0046b20503a39e6',
          firstName: 'Mike',
          lastName: 'Ibberson',
          email: 'mibberson@3merge.ca',
        },
      },
      {
        ref: '5eca9347f0046b20503a39e7',
        modifiedOn: '2020-05-24T15:31:20.100Z',
        target: 'friends',
        op: 'Update',
        modified: {
          'friends%2E0%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
          'friends%2E1%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
        },
        modifiedBy: {
          id: '5eca9347f0046b20503a39e6',
          firstName: 'Mike',
          lastName: 'Ibberson',
          email: 'mibberson@3merge.ca',
        },
      },
      {
        ref: '5eca9347f0046b20503a39e7',
        modifiedOn: '2020-05-24T15:31:20.025Z',
        target: 'friends',
        op: 'Create',
        modified: {
          'friends%2E0%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
          'friends%2E1%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
        },
        modifiedBy: {
          id: '5eca9347f0046b20503a39e6',
          firstName: 'Mike',
          lastName: 'Ibberson',
          email: 'mibberson@3merge.ca',
        },
      },
      {
        ref: '5eca9347f0046b20503a39e7',
        modifiedOn: '2020-05-24T15:31:19.966Z',
        target: 'friends',
        op: 'Create',
        modified: {
          'friends%2E0%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
          'friends%2E1%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
        },
        modifiedBy: {
          id: '5eca9347f0046b20503a39e6',
          firstName: 'Mike',
          lastName: 'Ibberson',
          email: 'mibberson@3merge.ca',
        },
      },
      {
        ref: '5eca9347f0046b20503a39e7',
        modifiedOn: '2020-05-24T15:31:19.916Z',
        target: 'friends',
        op: 'Create',
        modified: {
          'friends%2E0%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
          'friends%2E1%2Ename': {
            prev: 'Henry',
            curr: 'Ricky',
          },
        },
        modifiedBy: {
          id: '5eca9347f0046b20503a39e6',
          firstName: 'Mike',
          lastName: 'Ibberson',
          email: 'mibberson@3merge.ca',
        },
      },
    ]}
  />
);
