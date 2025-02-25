import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesAsync } from '../store/actions';
import { selectCategories } from '../store/selectors';
import { useCallback, useEffect } from 'react';

export const useCategories = () => {
	const dispatch = useDispatch();
	const { categories, isLoading, error } = useSelector(selectCategories);

	const loadCategories = useCallback(() => {
		dispatch(loadCategoriesAsync);
	}, [dispatch]);

	useEffect(() => {
		if (!categories) {
			loadCategories();
		}
	}, [loadCategories, categories]);

	return {
		categories,
		isLoading,
		error,
		// loadCategories,
	};
};
