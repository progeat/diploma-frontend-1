import { ACTION_TYPE } from './action-type';

export const setAccountsError = (error) => ({
	type: ACTION_TYPE.SET_ACCOUNTS_ERROR,
	payload: error,
});
