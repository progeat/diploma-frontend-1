import { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Account,
	Accounts,
	Authorization,
	Categories,
	Category,
	Main,
	Personal,
	Registration,
	Transaction,
	Transactions,
} from './pages';
import { Header, Loader, Modal } from './components';
import { setAccounts, setCategories, setUser } from './actions';
import { request } from './utils';
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

const Page = styled.div`
	margin: 0 auto;
	max-width: 1600px;
	width: 100%;
	height: 100%;
	padding: 70px 0 20px;
`;

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
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

	useEffect(() => {
		Promise.all([request('/accounts'), request('/categories')])
			.then(([accountsRes, categoriesRes]) => {
				if (accountsRes.error || categoriesRes.error) {
					console.error('Ошибка:', accountsRes.error || categoriesRes.error);
					return;
				}

				dispatch(setAccounts(accountsRes.data));
				dispatch(setCategories(categoriesRes.data));
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/transaction" element={<Transaction />} />
					<Route path="/transaction/:id/edit" element={<Transaction />} />
					<Route path="/transactions" element={<Transactions />} />
					<Route path="/category" element={<Category />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/account" element={<Account />} />
					<Route path="/account/:id/edit" element={<Account />} />
					<Route path="/personal" element={<Personal />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Modal />
		</AppColumn>
	);
};
