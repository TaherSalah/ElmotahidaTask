const initialState = {
    course: null,
  };
  
  const currentCourseReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_COURSE':
        return {
          ...state,
          course: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default currentCourseReducer;