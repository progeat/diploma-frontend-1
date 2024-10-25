import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Authorization, Registration, Transactions } from './pages';
import { Header } from './components';
import { setUser } from './actions';
import styled from 'styled-components';

const AppColumn = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 0 auto;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
`;

const Page = styled.div`
	height: 100%;
	padding: 120px 0 20px;
`;

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route
						path="/transaction"
						element={<div>Страница создания и редактирования операции</div>}
					/>
					<Route
						path="/category"
						element={<div>Страница создания и редактирования категории</div>}
					/>
					<Route
						path="/account"
						element={<div>Страница создания и редактирования счёта</div>}
					/>
					<Route path="/transactions" element={<Transactions />} />
					<Route
						path="/personal"
						element={<div>Персональная страница пользователя</div>}
					/>
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
		</AppColumn>
	);
};
