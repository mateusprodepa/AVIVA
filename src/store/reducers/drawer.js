import { TOGGLE_DRAWER } from '../actions/drawer';

const initialState = {
  isOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      console.log(action);
      return {
        isOpen: action.payload
      }
    default:
      return state;

  }
}
