import { ACTION_TYPE } from './action-type';

export const setLastPage = (lastPage) => ({
	type: ACTION_TYPE.SET_LAST_PAGE,
	payload: lastPage,
});
