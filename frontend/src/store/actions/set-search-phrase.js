import { ACTION_TYPE } from './action-type';

export const setSearchPhrase = (searchPhrase) => ({
	type: ACTION_TYPE.SET_SEARCH_PHRASE,
	payload: searchPhrase,
});
