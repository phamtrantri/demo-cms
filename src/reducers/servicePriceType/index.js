import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('servicePriceType');

export { reducer, actions, selectors, types };
