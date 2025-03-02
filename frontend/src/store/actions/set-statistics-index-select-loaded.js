import { ACTION_TYPE } from './action-type';

export const setStatisticsIndexSelectLoaded = (indexSelect) => ({
	type: ACTION_TYPE.SET_STATISTICS_INDEX_SELECT_LOADED,
	payload: indexSelect,
});
