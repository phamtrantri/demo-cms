import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('relationship');

export { reducer, actions, selectors, types };
