import {
  SET_COUNT_NOTIFICATION
} from '../actions/notification';

const initialState = {
  reFresh: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNT_NOTIFICATION:
      return { ...state, reFresh: action.payload };

    default:
      return state;
  }
};
export default notificationReducer;
