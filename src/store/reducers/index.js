import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import drawerReducer from './drawer';
import { dialog } from './dialog';
import { requests, requestsAreLoading, requestsHasErrored } from './requests';
import { user, userLoginIsLoading, userLoginHasErrored, userIsLoggedIn } from './auth';
import { newRequest, newRequestIsLoading, newRequestHasErrored } from './newRequest';

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
  newRequest,
  newRequestIsLoading,
  newRequestHasErrored
});

export default reducer
