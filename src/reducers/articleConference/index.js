import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator(
  'articleConference'
);

export { reducer, actions, selectors, types };
