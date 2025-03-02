import { ACTION_TYPE } from './action-type';

export const setTransactions = (transactions) => ({
	type: ACTION_TYPE.SET_TRANSACTIONS,
	payload: transactions,
});
