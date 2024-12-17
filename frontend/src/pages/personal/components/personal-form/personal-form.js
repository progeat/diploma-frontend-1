import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, Button, Input, Loader } from '../../../../components';
import { setUser } from '../../../../actions';
import { selectUser } from '../../../../selectors';
import { request } from '../../../../utils';
import styled from 'styled-components';

// TODO сделать обязательным ввод нового пароля с привязкой к вводу старого пароля
const personalFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	email: yup.string().email('Неверно заполнена почта').nullable(),
	phone: yup
		.string()
		.matches(
			/^$|^(\+?7|8)\d{10}$/,
			'Неверно задан номер телефона, формат +7XXXXXXXXXX',
		)
		.nullable(),
	newPassword: yup
		.string()
		.matches(
			/^$|^[\w#%]{6,}$/,
			'Неверно заполнен новый пароль. Допускаются только буквы, цифры, минимум 6 символов и знаки # %',
		)
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
		.nullable(),

	// TODO не работает привязка(выдает ошибку)
	// oldPassword: yup.string().when('newPassword', {
	// 	is: (value) => value && value.length > 0,
	// 	then: yup.string().required('Для смены пароля введите текущий пароль'),
	// 	otherwise: yup.string().nullable(),
	// }),

	oldPassword: yup
		.string()
		.matches(
			/^$|^[\w#%]{6,}$/,
			'Неверно заполнен старый пароль. Допускаются только буквы, цифры, минимум 6 символов и знаки # %',
		)
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
		.nullable(),
});

const PersonalFormContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const user = useSelector(selectUser);

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
		resolver: yupResolver(personalFormSchema),
	});

	const dispatch = useDispatch();

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

				console.log('resUser', user);

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const formError =
		errors?.login?.message ||
		errors?.email?.message ||
		errors?.phone?.message ||
		errors?.newPassword?.message ||
		errors?.oldPassword?.message;
	const errorMessage = formError || serverError;

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<h2>Изменить данные</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="text"
					placeholder="Почта..."
					{...register('email', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="tel"
					placeholder="Телефон..."
					{...register('phone', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Новый пароль..."
					{...register('newPassword', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Введите старый пароль..."
					{...register('oldPassword', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!isDirty || !!formError}>
					Отправить
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const PersonalForm = styled(PersonalFormContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 281px;
	padding: 20px;
	background-color: #ddd;

	& .form {
		display: flex;
		flex-direction: column;
	}

	& .form input {
		margin-bottom: 10px;
	}
`;
