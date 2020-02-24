import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('articleQA');

export { reducer, actions, selectors, types };
