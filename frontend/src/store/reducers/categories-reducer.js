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
		case ACTION_TYPE.SET_CATEGORY:
			return {
				...state,
				categories: [...state.categories, payload],
			};
		case ACTION_TYPE.UPDATE_CATEGORY:
			return {
				...state,
				categories: [...state.categories].map((category) =>
					category.id === payload.id ? payload : category,
				),
			};
		case ACTION_TYPE.REMOVE_CATEGORY:
			return {
				...state,
				categories: [...state.categories].filter(
					(category) => category.id !== payload,
				),
			};
		case ACTION_TYPE.RESET_CATEGORIES:
			return initialCategoriesState;
		default:
			return state;
	}
};
