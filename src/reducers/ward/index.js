import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('ward');

export { reducer, actions, selectors, types };
