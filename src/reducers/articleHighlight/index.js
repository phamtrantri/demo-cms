import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator(
  'articleHighlight'
);

export { reducer, actions, selectors, types };
