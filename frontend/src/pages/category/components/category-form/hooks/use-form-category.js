import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../../../../../utils/validators';
import {
	CLOSE_MODAL,
	openModal,
	RESET_CATEGORY_DATA,
	saveCategoryAsync,
	updateCategories,
} from '../../../../../store/actions';
import { selectCategories } from '../../../../../store/selectors';
import { getIconCategoryEditedOption, getIndexTypeCategoryEdited } from './helpers';
import { CATEGORY_TYPE_OPTIONS } from '../constants';
import { request } from '../../../../../utils';
import { useNavigate } from 'react-router-dom';

export const useFormCategory = ({ idCategory, category }) => {
	const indexTypeCategoryEdited = getIndexTypeCategoryEdited(category);
	const [indexActive, setIndexActive] = useState(indexTypeCategoryEdited);
	const IconCategoryEditedOption = getIconCategoryEditedOption(category);
	const { categories } = useSelector(selectCategories);
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!idCategory) {
			return;
		}

		return () => {
			dispatch(RESET_CATEGORY_DATA);
		};
	}, []);

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: category?.name || '',
			icon: IconCategoryEditedOption || null,
			color: category?.color || '#78D9C5',
		},
		resolver: yupResolver(categorySchema),
	});

	const onSubmit = ({ name, color, icon }) => {
		try {
			dispatch(
				saveCategoryAsync({
					id: idCategory,
					category: {
						name,
						type: CATEGORY_TYPE_OPTIONS[indexActive].value,
						color,
						icon: icon.value,
					},
					isCategories: !!categories,
				}),
			);

			setIsServerPass(true);

			if (!idCategory) {
				reset();
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
						dispatch(updateCategories);
					});

					navigate(-1);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const resetFormMessage = () => {
		setServerError(null);
		setIsServerPass(null);
	};

	const onToggleActive = (index) => {
		setIndexActive(index);
	};

	const formError = errors?.name?.message || errors?.type?.message;
	const errorMessage = formError || serverError;

	return {
		indexActive,
		register,
		control,
		handleSubmit,
		resetFormMessage,
		onToggleActive,
		onSubmit,
		onDeleteCategory,
		isServerPass,
		errorMessage,
	};
};
