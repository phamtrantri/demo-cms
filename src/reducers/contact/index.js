import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('contact');

export { reducer, actions, selectors, types };
