import { ACTION_TYPE } from '../actions';

const initialAccountState = {
	account: null,
	isLoading: true,
	error: null,
};

export const accountReducer = (state = initialAccountState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ACCOUNT_DATA:
			return {
				...state,
				account: payload,
			};
		case ACTION_TYPE.SET_ACCOUNT_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ACTION_TYPE.SET_ACCOUNT_ERROR:
			return {
				...state,
				error: payload,
			};
		case ACTION_TYPE.RESET_ACCOUNT_DATA:
			return initialAccountState;
		default:
			return state;
	}
};
