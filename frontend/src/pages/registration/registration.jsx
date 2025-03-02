import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Button, Input } from '../../components/common';
import { selectUserRole } from '../../store/selectors';
import { useRegistration } from './hooks';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const StyledLink = styled(Link)`
	text-align: left;
	text-decoration: underline;
	font-size: 18px;
	color: #4d525f;

	&:hover {
		color: #f8f8f9;
	}
`;

const RegistrationContainer = ({ className }) => {
	const { register, handleSubmit, onSubmit, setServerError, errorMessage } =
		useRegistration();
	const roleId = useSelector(selectUserRole);

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>Регистрация</h2>
				<form onSubmit={handleSubmit(onSubmit)} className="form">
					<Input
						label="Логин"
						type="text"
						placeholder="Логин..."
						{...register('login', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						label="Пароль"
						type="password"
						placeholder="Пароль..."
						{...register('password', {
							onChange: () => setServerError(null),
						})}
					/>
					<Input
						label="Повтор пароля"
						type="password"
						placeholder="Повтор пароля..."
						{...register('passcheck', {
							onChange: () => setServerError(null),
						})}
					/>
					<Button className="button-submit" type="submit">
						Отправить
					</Button>
					{errorMessage && <div className="error">{errorMessage}</div>}
					<StyledLink to="/login">Авторизация</StyledLink>
				</form>
			</div>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		border-radius: 24px;
		padding: 20px;
		background-color: #2b2d32;
	}

	& .form {
		display: flex;
		flex-direction: column;
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

	& .error {
		color: rgb(203, 108, 108);
	}
`;
