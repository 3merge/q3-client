import React from 'react';
import Swiper from 'react-id-swiper';
import MobileStepper from '@material-ui/core/MobileStepper';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import Steps, { Preview } from '.';

jest.mock('../useStyle', () => () => ({
  thumbs: null,
}));

const getProps = (args) => ({
  current: 0,
  swiper: {
    controller: {
      control: undefined,
    },
  },
  ...args,
});

describe('Slider/Steps', () => {
  it('should render Swiper component', () =>
    expect(
      global
        .shallow(
          <Steps {...getProps({ withThumbnails: true })} />,
        )
        .find(Swiper),
    ).toHaveLength(1));

  it('should render MobileStepper component', () =>
    expect(
      global
        .shallow(<Steps {...getProps()} />)
        .find(MobileStepper),
    ).toHaveLength(1));

  it('should render video icon', () =>
    expect(
      global
        .shallow(
          <Preview
            id="one"
            preview="https://google/ca"
            isVideo
          />,
        )
        .find(PlayCircleFilledWhiteIcon),
    ).toHaveLength(1));
});
