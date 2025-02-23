import { ACTION_TYPE } from '../actions';

const initialCategoriesState = {
	categories: null,
	isLoading: false,
	error: null,
};

export const categoriesReducer = (state = initialCategoriesState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: [...payload],
			};
		case ACTION_TYPE.SET_CATEGORIES_IS_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ACTION_TYPE.SET_CATEGORIES_ERROR:
			return {
				...state,
				error: payload,
			};
		case ACTION_TYPE.RESET_CATEGORIES:
			return initialCategoriesState;
		default:
			return state;
	}
};
