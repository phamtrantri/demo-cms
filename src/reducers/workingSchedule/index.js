import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator('workingSchedule');

export { reducer, actions, selectors, types };
