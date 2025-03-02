import { ACTION_TYPE } from '../actions';

const initialTransactionsState = {
	transactions: [],
	page: 1,
	lastPage: 1,
	isLoading: false,
	error: false,
};

export const transactionsReducer = (
	state = initialTransactionsState,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_TRANSACTIONS:
			return {
				...state,
				transactions: [...payload],
			};
		case ACTION_TYPE.SET_TRANSACTIONS_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ACTION_TYPE.SET_TRANSACTIONS_ERROR:
			return {
				...state,
				error: payload,
			};
		case ACTION_TYPE.SET_PAGE:
			return {
				...state,
				page: payload,
			};
		case ACTION_TYPE.SET_LAST_PAGE:
			return {
				...state,
				lastPage: payload,
			};
		case ACTION_TYPE.RESET_LAST_PAGE:
			return {
				...state,
				lastPage: initialTransactionsState.lastPage,
			};
		case ACTION_TYPE.RESET_TRANSACTIONS:
			return initialTransactionsState;
		default:
			return state;
	}
};
