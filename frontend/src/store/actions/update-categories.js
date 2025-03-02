import { request } from '../../utils';
import { setAppError } from './set-app-error';
import { setCategories } from './set-categories';
import { setCategoriesIsLoading } from './set-categories-is-loading';

export const updateCategories = async (dispatch) => {
	setCategoriesIsLoading(true);

	try {
		const { data } = await request('/categories');
		dispatch(setCategories(data));
	} catch (error) {
		dispatch(setAppError(error));
	} finally {
		dispatch(setCategoriesIsLoading(false));
	}
};
