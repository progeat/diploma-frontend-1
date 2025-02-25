import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	loadCategoriesAsync,
	loadCategoryAsync,
	openModal,
	removeCategory,
	RESET_CATEGORY_DATA,
	saveCategoryAsync,
} from '../store/actions';
import { request } from '../utils';
import { selectCategory, selectCategories } from '../store/selectors';

export const useCategory = (idCategory) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const { category, isLoading, error } = useSelector(selectCategory);
	const { categories } = useSelector(selectCategories);

	const loadCategory = useCallback(
		(id) => {
			if (!category) {
				dispatch(loadCategoryAsync(id));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);

	const onSubmitCategory = ({ formData, resetForm }) => {
		try {
			if (!categories) {
				dispatch(loadCategoriesAsync);
			}

			dispatch(saveCategoryAsync(idCategory, formData));

			setIsServerPass(true);

			if (!idCategory) {
				resetForm();
			}
		} catch (e) {
			setServerError(e.massage);
		}
	};

	const onDeleteCategory = () => {
		dispatch(
			openModal({
				text: 'Удалить категорию?',
				onConfirm: () => {
					request(`/categories/${idCategory}`, 'DELETE').then(() => {
						dispatch(removeCategory(idCategory));
						navigate(-1);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const resetServerStatus = () => {
		setServerError(null);
		setIsServerPass(null);
	};

	useEffect(() => {
		if (!idCategory) {
			return;
		}

		loadCategory(idCategory);

		return () => {
			dispatch(RESET_CATEGORY_DATA);
		};
	}, [dispatch, loadCategory, idCategory]);

	return {
		category,
		isLoading,
		categoryError: error || serverError,
		onSubmitCategory,
		onDeleteCategory,
		isServerPass,
		resetServerStatus,
	};
};
