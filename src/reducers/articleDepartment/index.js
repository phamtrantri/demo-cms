import { reduxGenerator } from 'utils/redux';

const { reducer, actions, selectors, types } = reduxGenerator(
  'articleDepartment'
);

export { reducer, actions, selectors, types };
