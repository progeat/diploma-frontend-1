import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import { logout } from '../../actions';
import { selectUserLogin, selectUserRole, selectUserSession } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { Icon } from '../icon/icon';

const HeaderContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const login = useSelector(selectUserLogin);
	const roleId = useSelector(selectUserRole);
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<div className="buttons">
				<Link to="/">Главная</Link>
				<Link to="/operations">История</Link>
				<button onClick={() => navigate(-1)}>Назад</button>
			</div>
			<div className="login-control">
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/autorization">Войти</Link>
					</Button>
				) : (
					<>
						<div className="login">{login}</div>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</div>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30px;
	height: 70px;
	width: 100%;
	background-color: #ddd;

	& .buttons > a:not(:last-child) {
		margin-right: 10px;
	}

	& .login-control {
		display: flex;
		align-items: center;
	}

	& .login {
		margin-right: 5px;
	}
`;
