import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoryAsync } from '../../../store/actions';
import { selectCategory } from '../../../store/selectors';

export const useCategory = (idCategory) => {
	const { category, isLoading, error } = useSelector(selectCategory);
	const dispatch = useDispatch();

	const loadCategory = useCallback(
		(id) => {
			if (!category) {
				dispatch(loadCategoryAsync(id));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);

	useEffect(() => {
		if (!idCategory) {
			return;
		}

		loadCategory(idCategory);
	}, [dispatch, loadCategory, idCategory]);

	return {
		idCategory,
		category,
		isLoading,
		error,
	};
};
