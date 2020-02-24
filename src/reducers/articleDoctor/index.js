import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('articleDoctor');

export { reducer, actions, selectors, types };
