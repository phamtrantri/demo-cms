import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('registration');

export { reducer, actions, selectors, types };
