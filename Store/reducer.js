import * as actionTypes from './actions';

const initialState = {
    numbers: 0
};
const reducer = (state = initialState, action) => {
  if(actionTypes.TEST_ACTION){
      return {
          ...state,
          numbers: state.numbers + 5
      };
  }
  return state;
};
export default reducer;