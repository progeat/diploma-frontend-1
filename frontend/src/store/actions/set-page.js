import { ACTION_TYPE } from './action-type';

export const setPage = (page) => ({
	type: ACTION_TYPE.SET_PAGE,
	payload: page,
});
