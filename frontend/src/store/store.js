import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	accountReducer,
	accountsReducer,
	categoryReducer,
	categoriesReducer,
	statisticsReducer,
} from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	account: accountReducer,
	accounts: accountsReducer,
	category: categoryReducer,
	categories: categoriesReducer,
	statistics: statisticsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
