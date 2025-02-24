import { useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Account,
	Authorization,
	Categories,
	Category,
	Error404,
	Main,
	Personal,
	Registration,
	Transaction,
	Transactions,
} from './pages';
import { PrivateRoutes } from './components/routes';
import { Modal } from './components/common';
import { Loader } from './components/ui';
import { setUser } from './store/actions';
import styled from 'styled-components';

const AppColumn = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 0 auto;
	height: 100vh;
	background-color: #141414;
`;

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			setIsLoading(false);

			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);

		setIsLoading(false);
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<AppColumn>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<Main />} />
					<Route path="/transaction" element={<Transaction />} />
					<Route path="/transaction/:id/edit" element={<Transaction />} />
					<Route path="/transactions" element={<Transactions />} />
					<Route path="/category" element={<Category />} />
					<Route path="/category/:id/edit" element={<Category />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/account" element={<Account />} />
					<Route path="/account/:id/edit" element={<Account />} />
					<Route path="/personal" element={<Personal />} />
				</Route>
				<Route path="/login" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
			<Modal />
		</AppColumn>
	);
};
