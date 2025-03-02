import { request } from '../../utils';
import { loadCategoriesAsync } from './load-categories-async';
import { setAppError } from './set-app-error';
import { setCategory } from './set-category';
import { setCategoryError } from './set-category-error';
import { updateCategory } from './update-category';

export const saveCategoryAsync =
	({ id, category, isCategories }) =>
	async (dispatch) => {
		try {
			if (!isCategories) {
				await dispatch(loadCategoriesAsync);
			}

			const { error, data } = await request(
				`/categories/${id || ''}`,
				`${id ? 'PATCH' : 'POST'}`,
				category,
			);

			if (error) {
				throw new Error(`Ошибка: ${error}`);
			}

			if (id) {
				dispatch(updateCategory(data));
			} else {
				dispatch(setCategory(data));
			}
		} catch (error) {
			dispatch(setCategoryError(error));
			dispatch(setAppError(error));
		}
	};
