import { ACTION_TYPE } from './action-type';

export const setAccountBalance = (id, account) => ({
	type: ACTION_TYPE.SET_ACCOUNT_BALANCE,
	payload: { id, account },
});
