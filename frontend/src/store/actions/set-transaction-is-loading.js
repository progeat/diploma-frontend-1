import { ACTION_TYPE } from './action-type';

export const setTransactionIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_TRANSACTION_IS_LOADING,
	payload: isLoading,
});
