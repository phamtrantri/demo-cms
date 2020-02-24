import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('language');

export { reducer, actions, selectors, types };
