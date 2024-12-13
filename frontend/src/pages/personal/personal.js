import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthFormError, Button, Input } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { request } from '../../utils';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	email: yup,
	phone: yup,
});

const PersonalContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			email: '',
			phone: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = (value) => {
		console.log(value);
	};

	const formError = errors?.login?.message || errors?.password?.message;
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
						type="email"
						placeholder="Почта..."
						{...register('email', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="phone"
						placeholder="Телефон..."
						{...register('phone', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="password"
						placeholder="Новый пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						type="password"
						placeholder="Введите старый пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
					<Button type="submit" disabled={!!formError}>
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
