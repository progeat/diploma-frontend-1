import { ACTION_TYPE } from './action-type';

export const setStatisticsIsLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_STATISTICS_IS_LOADING,
	payload: isLoading,
});
