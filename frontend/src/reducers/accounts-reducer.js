import { ACTION_TYPE } from '../actions';

const initialAccountsState = {
	accounts: [],
};

export const accountsReducer = (state = initialAccountsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ACCOUNTS:
			return {
				...state,
				accounts: [...state.accounts, ...payload],
			};
		default:
			return state;
	}
};
