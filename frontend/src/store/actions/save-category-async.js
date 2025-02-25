import { request } from '../../utils';
import { setCategory } from './set-category';
import { updateCategory } from './update-category';

export const saveCategoryAsync = (id, formData) => (dispatch) => {
	request(`/categories/${id || ''}`, `${id ? 'PATCH' : 'POST'}`, formData).then(
		({ error, data }) => {
			if (error) {
				throw new Error(`Ошибка: ${error}`);
			}

			if (id) {
				dispatch(updateCategory(data));
			} else {
				dispatch(setCategory(data));
			}
		},
	);
};
