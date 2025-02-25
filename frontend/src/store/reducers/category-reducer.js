import { ACTION_TYPE } from '../actions';

const initialCategoryState = {
	category: null,
	isLoading: true,
	error: null,
};

export const categoryReducer = (state = initialCategoryState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_CATEGORY_DATA:
			return {
				...state,
				category: payload,
			};
		case ACTION_TYPE.SET_CATEGORY_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ACTION_TYPE.SET_CATEGORY_ERROR:
			return {
				...state,
				error: payload,
			};
		case ACTION_TYPE.RESET_CATEGORY_DATA:
			return initialCategoryState;
		default:
			return state;
	}
};
