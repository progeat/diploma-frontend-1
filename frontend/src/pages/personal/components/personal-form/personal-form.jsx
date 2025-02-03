import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../../components/common';
import { Loader } from '../../../../components/ui';
import {
	CLOSE_MODAL,
	LOGOUT,
	openModal,
	RESET_ACCOUNTS,
	RESET_CATEGORIES,
	setUser,
} from '../../../../store/actions';
import { selectUser } from '../../../../store/selectors';
import { request } from '../../../../utils';
import { userSchema } from '../../../../utils/validators';
import styled from 'styled-components';

const PersonalFormContainer = ({ className }) => {
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
						onChange: () => {
							setServerError(null);
							setIsServerPass(null);
						},
					})}
				/>
				<Input
					type="text"
					placeholder="Почта..."
					{...register('email', {
						onChange: () => {
							setServerError(null);
							setIsServerPass(null);
						},
					})}
				/>
				<Input
					type="tel"
					placeholder="Телефон..."
					{...register('phone', {
						onChange: () => {
							setServerError(null);
							setIsServerPass(null);
						},
					})}
				/>
				<Input
					type="password"
					placeholder="Новый пароль..."
					{...register('newPassword', {
						onChange: () => {
							setServerError(null);
							setIsServerPass(null);
						},
					})}
				/>
				<Input
					type="password"
					placeholder="Введите старый пароль..."
					{...register('oldPassword', {
						onChange: () => {
							setServerError(null);
							setIsServerPass(null);
						},
					})}
				/>
				<Button
					className="button-submit"
					type="submit"
					disabled={!isDirty || !!formError}
				>
					Отправить
				</Button>
				<button className="delete-button" type="button" onClick={onDeleteUser}>
					Удалить аккаунт
				</button>
				{errorMessage && <div className="error">{errorMessage}</div>}
				{isServerPass && <div className="pass">Отправленно</div>}
			</form>
		</div>
	);
};

export const PersonalForm = styled(PersonalFormContainer)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 281px;
	border-radius: 24px;
	padding: 20px;
	background-color: #2b2d32;

	& form {
		display: flex;
		flex-direction: column;
	}

	& form input {
		margin-bottom: 10px;
		border-radius: 8px;
		border-color: #5e636f;
		color: #f8f8f9;
	}

	// TODO разобраться почему не работает last-child
	& form input:last-child {
		margin-bottom: 20px;
	}

	& form input:hover {
		outline: 2px solid #f8f8f9;
	}

	& .button-submit {
		margin-bottom: 10px;
		height: 38px;
		border: 1px solid #f8f8f9;
		border-radius: 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .button-submit:hover {
		color: #000;
		background-color: #f8f8f9;
	}

	& .delete-button {
		text-align: left;
		width: max-content;
		border: 0;
		color: rgb(156, 156, 156);
		background-color: inherit;
		cursor: pointer;
	}

	& .delete-button:hover {
		color: #f8f8f9;
	}

	& .pass {
		color: #6ccb81;
	}

	& .error {
		color: rgb(203, 108, 108);
	}
`;
