import {
  USER_LOGIN_IS_LOADING,
  USER_LOGIN_HAS_ERRORED,
  USER_LOGIN_SUCCESS,
  USER_IS_LOGGED_IN,
  USER_LOGOUT_RESET_STORE
} from '../actions/auth';

export function userLoginHasErrored(state = { hasErrored: false, errors: {} }, action) {
  switch(action.type) {
    case USER_LOGIN_HAS_ERRORED:
      return {
        hasErrored: action.hasErrored,
        errors: action.errors
      }

    default:
      return state;
  }
}

export function userLoginIsLoading(state = false, action) {
  switch(action.type) {
    case USER_LOGIN_IS_LOADING:
      return action.isLoading;

    default:
      return state;
  }
}

export function userIsLoggedIn(state = false, action) {
  switch(action.type) {
    case USER_IS_LOGGED_IN:
      return action.isLoggedIn;

    default:
      return state;
  }
}

export function userLogoutResetStore(state = {}, action) {
  switch(action.type) {
    case USER_LOGOUT_RESET_STORE:
      return {}

    default:
      return state;
  }
}

export function user(state = {}, action) {
  switch(action.type) {
    case USER_LOGIN_SUCCESS:
      return action.user;

    default:
      return state;
  }
}
