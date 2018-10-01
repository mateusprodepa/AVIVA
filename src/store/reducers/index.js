import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawerReducer from './drawer';
import { dialog } from './dialog';
import { requests, requestsAreLoading, requestsHasErrored } from './requests';
import { user, userLoginIsLoading, userLoginHasErrored, userIsLoggedIn, userLogoutResetStore } from './auth';
import { newRequest, newRequestIsLoading, newRequestHasErrored } from './newRequest';
import { snackbar } from './snackbar';
import { advice } from './advice';

const reducer = combineReducers({
  router: routerReducer,
  drawer: drawerReducer,
  dialog,
  requests,
  requestsAreLoading,
  requestsHasErrored,
  user,
  userLoginIsLoading,
  userLoginHasErrored,
  userIsLoggedIn,
  userLogoutResetStore,
  newRequest,
  newRequestIsLoading,
  newRequestHasErrored,
  snackbar,
  advice
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT_RESET_STORE') {
    state = undefined;
  }

  return reducer(state, action);
}

export default rootReducer;
