import { ACTION_TYPE } from './action-type';

export const setTransactionData = (transaction) => ({
	type: ACTION_TYPE.SET_TRANSACTION_DATA,
	payload: transaction,
});
