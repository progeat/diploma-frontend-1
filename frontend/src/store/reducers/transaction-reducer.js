import { ACTION_TYPE } from '../actions';

const initialTransactionState = {
	transaction: null,
	isLoading: true,
	error: null,
};

export const transactionReducer = (
	state = initialTransactionState,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_TRANSACTION_DATA:
			return {
				...state,
				transaction: payload,
			};
		case ACTION_TYPE.SET_TRANSACTION_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ACTION_TYPE.SET_TRANSACTION_ERROR:
			return {
				...state,
				error: payload,
			};
		case ACTION_TYPE.RESET_TRANSACTION_DATA:
			return initialTransactionState;
		default:
			return state;
	}
};
