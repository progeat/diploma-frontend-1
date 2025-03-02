import { request } from '../../utils';
import { setAppError } from './set-app-error';
import { setCategories } from './set-categories';
import { setCategoriesIsLoading } from './set-categories-is-loading';

export const loadCategoriesAsync = async (dispatch) => {
	dispatch(setCategoriesIsLoading(true));

	try {
		const { data, error } = await request('/categories');

		if (error) {
			throw new Error(`Ошибка: ${error}`);
		}

		dispatch(setCategories(data));
	} catch (error) {
		dispatch(setAppError(error));
	} finally {
		dispatch(setCategoriesIsLoading(false));
	}
};
