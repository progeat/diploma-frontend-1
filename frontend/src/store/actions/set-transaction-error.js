import { ACTION_TYPE } from './action-type';

export const setTransactionError = (error) => ({
	type: ACTION_TYPE.SET_TRANSACTION_ERROR,
	payload: error,
});
