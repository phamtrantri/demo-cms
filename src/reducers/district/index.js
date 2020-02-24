import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('district');

export { reducer, actions, selectors, types };
