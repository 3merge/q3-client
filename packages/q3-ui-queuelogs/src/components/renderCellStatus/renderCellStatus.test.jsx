import { blue } from '@material-ui/core/colors';
import renderCellStatus from './renderCellStatus';

describe('renderCellStatus', () => {
  it('should map status to colour', () => {
    const {
      props: {
        style: { backgroundColor },
      },
    } = renderCellStatus({
      value: 'Done',
    });

    expect(backgroundColor).toMatch(blue[100]);
  });
});
