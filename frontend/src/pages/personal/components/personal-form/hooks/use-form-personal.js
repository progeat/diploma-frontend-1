import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../../../../utils/validators';
import { selectUser } from '../../../../../store/selectors';
import {
	CLOSE_MODAL,
	LOGOUT,
	openModal,
	RESET_ACCOUNTS,
	RESET_CATEGORIES,
	setUser,
} from '../../../../../store/actions';
import { request } from '../../../../../utils';

export const useFormPersonal = () => {
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const defaultValues = {
		login: user.login,
		newPassword: '',
		oldPassword: '',
		email: user.email || '',
		phone: user.phone || '',
	};

	const {
		register,
		handleSubmit,
		formState: { isDirty, errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(userSchema),
	});

	const onDeleteUser = () => {
		dispatch(
			openModal({
				text: 'Удалить аккаунт безвозвратно?',
				onConfirm: () => {
					request(`/user`, 'DELETE').then(() => {
						dispatch(LOGOUT);
						dispatch(RESET_ACCOUNTS);
						dispatch(RESET_CATEGORIES);
						sessionStorage.removeItem('userData');
						navigate('/login');
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const onSubmit = (data) => {
		setIsLoading(true);

		const changedData = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== defaultValues[key]),
		);

		request('/user', 'PATCH', changedData)
			.then(({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				setIsServerPass(true);
				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const resetFormMessage = () => {
		setServerError(null);
		setIsServerPass(null);
	};

	const formError =
		errors?.login?.message ||
		errors?.email?.message ||
		errors?.phone?.message ||
		errors?.newPassword?.message ||
		errors?.oldPassword?.message;
	const errorMessage = formError || serverError;

	return {
		register,
		isDirty,
		handleSubmit,
		onSubmit,
		onDeleteUser,
		resetFormMessage,
		isLoading,
		isServerPass,
		errorMessage,
	};
};
