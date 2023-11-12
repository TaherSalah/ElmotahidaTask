import { combineReducers } from 'redux';
import currentCourseReducer from './currentCourse';

const rootReducer = combineReducers({
  currentCourse: currentCourseReducer,
});

export default rootReducer;