import { ACTION_TYPE } from '../actions';

const initialStatisticsState = {
	statistics: {
		expenses: null,
		income: null,
	},
	indexSelect: 0,
	indexSelectLoaded: 0,
	isLoading: true,
	error: null,
};

export const statisticsReducer = (state = initialStatisticsState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_STATISTICS:
			return {
				...state,
				statistics: { ...payload },
			};
		case ACTION_TYPE.SET_STATISTICS_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ACTION_TYPE.SET_STATISTICS_INDEX_SELECT:
			return {
				...state,
				indexSelect: payload,
			};
		case ACTION_TYPE.SET_STATISTICS_INDEX_SELECT_LOADED:
			return {
				...state,
				indexSelectLoaded: payload,
			};
		case ACTION_TYPE.RESET_STATISTICS:
			return initialStatisticsState;
		default:
			return state;
	}
};
