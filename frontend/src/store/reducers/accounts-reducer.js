import { ACTION_TYPE } from '../actions';

const initialAccountsState = {
	accounts: null,
	isLoading: false,
	error: false,
};

export const accountsReducer = (state = initialAccountsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ACCOUNTS:
			return {
				...state,
				accounts: [...payload],
			};
		case ACTION_TYPE.SET_ACCOUNTS_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ACTION_TYPE.SET_ACCOUNTS_ERROR:
			return {
				...state,
				error: payload,
			};
		case ACTION_TYPE.SET_ACCOUNT:
			return {
				...state,
				accounts: [...state.accounts, payload].sort(
					(a, b) => b.balance - a.balance,
				),
			};
		case ACTION_TYPE.UPDATE_ACCOUNT:
			return {
				...state,
				accounts: [...state.accounts].map((account) =>
					account.id === payload.id ? payload : account,
				),
			};
		case ACTION_TYPE.REMOVE_ACCOUNT:
			return {
				...state,
				accounts: [...state.accounts].filter((account) => account.id !== payload),
			};
		case ACTION_TYPE.SET_ACCOUNT_BALANCE:
			return {
				...state,
				accounts: state.accounts.map((account) =>
					account.id === payload.id ? payload.account : account,
				),
			};
		case ACTION_TYPE.RESET_ACCOUNTS:
			return initialAccountsState;
		default:
			return state;
	}
};
