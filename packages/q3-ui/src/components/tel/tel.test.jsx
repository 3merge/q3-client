import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tel from '.';
import { materialShallow } from '../../helpers/testUtils';

describe('Feature telephone', () => {
  it('should render outbound link safely', () => {
    const number = '905-123-1234';
    const wrapper = materialShallow(Tel, {
      number,
    });
    expect(
      wrapper
        .find(Typography)
        .at(1)
        .text(),
    ).toMatch(number);
    expect(wrapper.find(Button).props()).toEqual(
      expect.objectContaining({
        component: 'a',
        href: 'tel:905-123-1234',
      }),
    );
  });

  it('should render nothing without a number', () => {
    const wrapper = materialShallow(Tel);
    expect(wrapper).toMatchObject({});
  });
});
