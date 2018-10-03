import {
  GET_ROOMS_SUCCESS,
  GET_ROOMS_IS_LOADING,
  GET_ROOMS_HAS_ERRORED
} from '../actions/rooms';

export function rooms(state = [], action) {

  switch(action.type) {

    case GET_ROOMS_SUCCESS:
      return action.rooms;

    default:
      return state;

  }

}

export function roomsAreLoading(state = false, action) {

  switch(action.type) {

    case GET_ROOMS_IS_LOADING:
      return action.isLoading;

    default:
      return state;

  }

}

export function roomsHasErrored(state = false, action) {

  switch(action.type) {

    case GET_ROOMS_HAS_ERRORED:
      return action.hasErrored

    default:
      return state;

  }

}
