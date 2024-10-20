import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AutorizationContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>Авторизация</h2>
				<form className="form">
					<input type="text" placeholder="Логин" />
					<input type="password" placeholder="Пароль" />
					<button type="submit">Отправить</button>
				</form>
				<Link to="/registration">Регистрация</Link>
			</div>
		</div>
	);
};

export const Autorization = styled(AutorizationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
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
