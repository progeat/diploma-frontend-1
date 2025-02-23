import { request } from '../../utils';
import { setCategories } from './set-categories';
import { setCategoriesError } from './set-categories-error';
import { setCategoriesIsLoading } from './set-categories-is-loading';

export const loadCategoriesAsync = (dispatch) => {
	dispatch(setCategoriesIsLoading(true));

	request('/categories')
		.then(({ data, error }) => {
			if (error) {
				dispatch(setCategoriesError(error));

				return;
			}

			dispatch(setCategories(data));
		})
		.finally(() => {
			dispatch(setCategoriesIsLoading(false));
		});
};
