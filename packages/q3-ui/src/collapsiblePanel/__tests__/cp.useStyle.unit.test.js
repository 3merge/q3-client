import { orange, green } from '@material-ui/core/colors';
import {
  getColorByIndex,
  makeBorderColorProperty,
} from '../useStyle';

const index = 900;

describe('"getColorByIndex"', () => {
  it('should return green', () => {
    expect(getColorByIndex(false)([index])).toMatch(
      orange[index],
    );
  });

  it('should return orange', () => {
    expect(getColorByIndex(true)([index])).toMatch(
      green[index],
    );
  });
});

describe('"makeBorderColorProperty"', () => {
  it('should return color string', () => {
    expect(makeBorderColorProperty(green)).toHaveProperty(
      'borderLeft',
    );
  });
});
