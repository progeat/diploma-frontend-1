import { Button, Input } from '../../../../components/common';
import { Loader } from '../../../../components/ui';
import { useFormPersonal } from './hooks/use-form-personal';
import styled from 'styled-components';

const PersonalFormContainer = ({ className }) => {
	const {
		register,
		isDirty,
		handleSubmit,
		onSubmit,
		onDeleteUser,
		resetFormMessage,
		isLoading,
		isServerPass,
		errorMessage,
	} = useFormPersonal();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<h2>Изменить данные</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Логин"
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: resetFormMessage,
					})}
				/>
				<Input
					label="Почта"
					type="text"
					placeholder="Почта..."
					{...register('email', {
						onChange: resetFormMessage,
					})}
				/>
				<Input
					label="Телефон"
					type="tel"
					placeholder="Телефон..."
					{...register('phone', {
						onChange: resetFormMessage,
					})}
				/>
				<Input
					label="Новый пароль"
					type="password"
					placeholder="Новый пароль..."
					{...register('newPassword', {
						onChange: resetFormMessage,
					})}
				/>
				<Input
					label="Старый пароль"
					type="password"
					placeholder="Введите старый пароль..."
					{...register('oldPassword', {
						onChange: resetFormMessage,
					})}
				/>
				<Button
					className="button-submit"
					type="submit"
					disabled={!isDirty || !!errorMessage}
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
		width: 100%;
	}

	& form input {
		margin-bottom: 10px;
		border-radius: 8px;
		border-color: #5e636f;
		color: #f8f8f9;
	}

	& form input:hover {
		outline: 2px solid #f8f8f9;
	}

	& .button-submit {
		margin: 10px 0;
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
