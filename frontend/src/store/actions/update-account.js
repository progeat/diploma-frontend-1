import { ACTION_TYPE } from './action-type';

export const updateAccount = (account) => ({
	type: ACTION_TYPE.UPDATE_ACCOUNT,
	payload: account,
});
