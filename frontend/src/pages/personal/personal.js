import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, Button, Input, Loader } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUser, selectUserId } from '../../selectors';
import { request } from '../../utils';
import { ROLE } from '../../constants';
import styled from 'styled-components';

// TODO сделать обязательным ввод нового пароля с привязкой к вводу старого пароля
const personalFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	newPassword: yup
		.string()
		.matches(
			/^$|^[\w#%]{6,}$/,
			'Неверно заполнен новый пароль. Допускаются только буквы, цифры, минимум 6 символов и знаки # %',
		)
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
		.nullable(),
	email: yup.string().email('Неверно заполнена почта').nullable(),
	phone: yup
		.string()
		.matches(
			/^$|^(\+?7|8)\d{10}$/,
			'Неверно задан номер телефона, формат +7XXXXXXXXXX',
		)
		.nullable(),
	oldPassword: yup
		.string()
		.matches(
			/^$|^[\w#%]{6,}$/,
			'Неверно заполнен старый пароль. Допускаются только буквы, цифры, минимум 6 символов и знаки # %',
		)
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
		.nullable(),
});

const PersonalContainer = ({ className }) => {
	const [userData, setUserData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
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

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		const changedData = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => value !== defaultValues[key]),
		);

		request('/user', 'PATCH', changedData).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			console.log('resUser', user);

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError =
		errors?.login?.message ||
		errors?.email?.message ||
		errors?.phone?.message ||
		errors?.newPassword?.message ||
		errors?.oldPassword?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<div className="form-wrapper">
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
		</div>
	);
};

export const Personal = styled(PersonalContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		padding: 20px;
		background-color: #ddd;
	}

	& .form {
		display: flex;
		flex-direction: column;
	}

	& .form input {
		margin-bottom: 10px;
	}
`;
