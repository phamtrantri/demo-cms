import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('doctor');

export { reducer, actions, selectors, types };
