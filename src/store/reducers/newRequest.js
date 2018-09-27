import {
  NEW_REQUEST_IS_LOADING,
  NEW_REQUEST_HAS_ERRORED,
  NEW_REQUEST_SUCCESS
} from '../actions/newRequest';

export function newRequestHasErrored(state = false, action) {
  switch(action.type) {

    case NEW_REQUEST_HAS_ERRORED:
      return action.hasErrored

    default:
      return state;
  }
}

export function newRequestIsLoading(state = false, action) {
  switch(action.type) {

    case NEW_REQUEST_IS_LOADING:
      return action.isLoading

    default:
      return state;
  }
}

export function newRequest(state = {}, action) {
  switch(action.type) {

    case NEW_REQUEST_SUCCESS:
      return action.request;

    default:
      return state;
  }
}
