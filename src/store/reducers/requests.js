import {
  REQUESTS_ARE_LOADING,
  REQUESTS_HAS_ERRORED,
  REQUESTS_FETCH_DATA_SUCCESS
} from '../actions/requests';

export function requestsHasErrored(state = false, action) {
  switch(action.type) {
    case REQUESTS_HAS_ERRORED:
      return action.hasErrored

    default:
      return state;
  }
}

export function requestsAreLoading(state = false, action) {
  switch(action.type) {
    case REQUESTS_ARE_LOADING:
      return action.isLoading

    default:
      return state;
  }
}

export function requests(state = [], action) {
  switch(action.type) {
    case REQUESTS_FETCH_DATA_SUCCESS:
      return action.requests;

    default:
      return state;
  }
}
