import { useEffect, useMemo, useState } from 'react';
import { ControlPanel, Pagination, Search, TransactionsList } from './components';
import { request } from '../../utils';
import { debounce } from './utils';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';

const TransactionsContainer = ({ className }) => {
	const [transactions, setTransactions] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [filter, setFilter] = useState({
		dateRange: ['', ''],
		account: '',
		category: '',
	});
	const [triggerFlag, setTriggerFlag] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		request(
			`/transactions?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&dateStart=${filter.dateRange[0]}&dateEnd=${filter.dateRange[1]}&account=${filter.account}&category=${filter.category}`,
		)
			.then(({ data: { transactions, lastPage } }) => {
				setTransactions(transactions);
				setLastPage(lastPage);

				if (page > lastPage) {
					setPage(lastPage);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, filter, triggerFlag]);

	const startDelayedSearch = useMemo(() => debounce(setTriggerFlag, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!triggerFlag);
	};

	return (
		<div className={className}>
			<div className="header">
				<h2>История операций</h2>
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				<ControlPanel setFilter={setFilter} />
			</div>
			<TransactionsList
				transactions={transactions}
				isLoading={isLoading}
				// TODO прокидываем сеттер состояния(setTriggerFlag) через компонент(?) или используем менеджер состояния(?)
				setTriggerFlag={setTriggerFlag}
			/>
			{lastPage > 1 && transactions.length > 0 && (
				// TODO при удалении с последней страницы всех операций нужно переключится на предыдущую
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Transactions = styled(TransactionsContainer)`
	padding: 15px;

	& h2 {
		margin-right: 100px;
	}

	& .header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
`;
