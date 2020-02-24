import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('photo');

export { reducer, actions, selectors, types };
