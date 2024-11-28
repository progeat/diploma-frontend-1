import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	usersReducer,
	accountReducer,
	accountsReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: accountReducer,
	posts: accountsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
