import { ACTION_TYPE } from '../actions';

const initialCategoriesState = {
	categories: [],
};

export const categoriesReducer = (state = initialCategoriesState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: [...payload],
			};
		default:
			return state;
	}
};
