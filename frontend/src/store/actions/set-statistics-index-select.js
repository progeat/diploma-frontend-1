import { ACTION_TYPE } from './action-type';

export const setStatisticsIndexSelect = (indexSelect) => ({
	type: ACTION_TYPE.SET_STATISTICS_INDEX_SELECT,
	payload: indexSelect,
});
