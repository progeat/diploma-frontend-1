import { ACTION_TYPE } from './action-type';

export const setStatisticsError = (error) => ({
	type: ACTION_TYPE.SET_STATISTICS_ERROR,
	payload: error,
});
