import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesAsync } from '../store/actions';
import { selectCategories } from '../store/selectors';

export const useCategories = () => {
	const dispatch = useDispatch();
	const { categories, isLoading, error } = useSelector(selectCategories);

	const loadCategories = () => {
		if (!categories) {
			dispatch(loadCategoriesAsync);
		}
	};

	return {
		categories,
		isLoading,
		error,
		loadCategories,
	};
};
