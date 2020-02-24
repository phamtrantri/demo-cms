import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator(
  'doctorDepartment'
);

export { reducer, actions, selectors, types };
