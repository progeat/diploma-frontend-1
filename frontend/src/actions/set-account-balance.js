import { ACTION_TYPE } from './action-type';

// TODO удалить если не используется
export const setAccountBalance = (id, account) => ({
	type: ACTION_TYPE.SET_ACCOUNT_BALANCE,
	payload: { id, account },
});
