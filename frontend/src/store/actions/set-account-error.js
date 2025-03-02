import { ACTION_TYPE } from './action-type';

export const setAccountError = (error) => ({
	type: ACTION_TYPE.SET_ACCOUNT_ERROR,
	payload: error,
});
