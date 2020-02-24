import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('folk');

export { reducer, actions, selectors, types };
