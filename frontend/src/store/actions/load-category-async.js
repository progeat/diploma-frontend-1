import { request } from '../../utils';
import { setAppError } from './set-app-error';
import { setCategoryData } from './set-category-data';
import { setCategoryError } from './set-category-error';
import { setCategoryIsLoading } from './set-category-is-loading';

export const loadCategoryAsync = (id) => (dispatch) => {
	request(`/categories/${id}`)
		.then(({ data, error }) => {
			if (error) {
				dispatch(setCategoryError(error));

				return;
			}

			dispatch(setCategoryData(data));
		})
		.catch((error) => {
			dispatch(setAppError(error));
		})
		.finally(() => {
			dispatch(setCategoryIsLoading(false));
		});
};
