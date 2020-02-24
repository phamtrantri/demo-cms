import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('articleIntro');

export { reducer, actions, selectors, types };
