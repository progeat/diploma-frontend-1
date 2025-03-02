import { ACTION_TYPE } from './action-type';

export const setTransactionsIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_TRANSACTIONS_IS_LOADING,
	payload: isLoading,
});
