import { ACTION_TYPE } from './action-type';

export const setPage = (Page) => ({
	type: ACTION_TYPE.SET_PAGE,
	payload: Page,
});
