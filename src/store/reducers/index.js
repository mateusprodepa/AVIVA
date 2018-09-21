import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import drawerReducer from './drawer';

const reducer = combineReducers({
  form: formReducer,
  router: routerReducer,
  drawer: drawerReducer
})

export default reducer
