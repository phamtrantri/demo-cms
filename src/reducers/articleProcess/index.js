import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('articleProcess');

export { reducer, actions, selectors, types };
