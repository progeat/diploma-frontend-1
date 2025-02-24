import { ACTION_TYPE } from './action-type';

export const setAccountData = (account) => ({
	type: ACTION_TYPE.SET_ACCOUNT_DATA,
	payload: account,
});
