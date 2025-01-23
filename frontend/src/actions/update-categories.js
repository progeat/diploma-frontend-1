import { request } from '../utils';
import { setCategories } from './set-categories';

export const updateCategories = async (dispatch) => {
	request('/categories').then(({ data }) => {
		console.log('updateCategories', data);
		dispatch(setCategories(data));
	});
};
