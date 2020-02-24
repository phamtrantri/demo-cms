import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('articleBanner');

export { reducer, actions, selectors, types };
