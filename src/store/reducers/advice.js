import { HIDE_ADVICE } from '../actions/advice';

const initialState = {
  hidden: false
}

export function advice(state = initialState, action) {
  switch(action.type) {
    case HIDE_ADVICE:
      return {
        hidden: true
      }

    default:
      return state;
  }
}
