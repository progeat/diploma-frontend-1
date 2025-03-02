import { ACTION_TYPE } from './action-type';

export const setAppError = (error) => ({
	type: ACTION_TYPE.SET_APP_ERROR,
	payload: error,
});
