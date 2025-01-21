import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import { LOGOUT } from '../../actions';
import { selectUserLogin, selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { Icon } from '../icon/icon';

const HeaderContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const login = useSelector(selectUserLogin);
	const roleId = useSelector(selectUserRole);

	const onLogout = () => {
		dispatch(LOGOUT);
		sessionStorage.removeItem('userData');
		navigate('/login');
	};

	return (
		<div className={className}>
			<div className="buttons">
				<Link to="/">Главная</Link>
				<Link to="/transactions">История</Link>
				<Link to="/accounts">Счета</Link>
				<Link to="/categories">Категории</Link>
				<button onClick={() => navigate(-1)}>Назад</button>
			</div>
			<div className="login-control">
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<div className="login">{login}</div>
						<Icon
							id="fa-cog"
							margin="0 10px 0 0"
							onClick={() => navigate('/personal')}
						/>
						<Icon id="fa-sign-out" onClick={onLogout} />
					</>
				)}
			</div>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	position: fixed;
	z-index: 1000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 70px;
	width: 100%;
	padding: 0 30px;
	background-color: rgb(26 26 26 / 70%);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Тень */
	backdrop-filter: blur(20px);

	& .buttons > a:not(:last-child) {
		margin-right: 10px;
	}

	& .login-control {
		display: flex;
		align-items: center;
	}

	& .login {
		margin-right: 10px;
	}
`;
