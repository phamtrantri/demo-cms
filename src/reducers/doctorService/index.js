import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('doctorService');

export { reducer, actions, selectors, types };
