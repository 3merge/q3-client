import React from 'react';
import CallToAction from '.';
import fixture from './__fixtures__';

export default {
  title: 'Q3 UI/Components/CallToAction',
};

export const Default = () => (
  <CallToAction
    {...fixture}
    body="If more information is required"
  />
);
export const Light = () => (
  <CallToAction
    {...fixture}
    backgroundColor="#222"
    color="#FFF"
  />
);
