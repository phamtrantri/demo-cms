import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('articleMenu');

export { reducer, actions, selectors, types };
