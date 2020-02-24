import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('servicePrice');

export { reducer, actions, selectors, types };
