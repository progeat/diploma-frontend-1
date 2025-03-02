import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageContaner = ({ className }) => {
	return (
		<div className={className}>
			<h1 className="error-code">404</h1>
			<h2 className="error-title">Страница не найдена</h2>
			<p className="error-message">
				Извините, запрашиваемая страница не существует
			</p>
			<Link className="main-link" to="/">
				Вернуться на главную
			</Link>
		</div>
	);
};

export const NotFoundPage = styled(NotFoundPageContaner)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	text-align: center;
	padding: 35px;

	& .error-code {
		margin: 0;
		font-size: 80px;
		font-weight: bold;
		color: #dc3545;
	}

	& .error-title {
		margin: 18px 0;
		font-size: 30px;
		color: #dc3545;
	}

	& .error-message {
		max-width: 600px;
		margin-bottom: 30px;
		font-size: 20px;
		color: #dc3545;
	}

	& .main-link {
		border-radius: 5px;
		padding: 14px 25px;
		color: white;
		text-decoration: none;
		background-color: #239f78;
		transaction: background-color 0.3s ease;
	}

	& .main-link:hover {
		background-color: #21c894;
	}
`;
