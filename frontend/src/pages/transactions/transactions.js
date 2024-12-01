import { useEffect, useMemo, useState } from 'react';
import { ControlPanel, Pagination, Search, TransactionsList } from './components';
import { request } from '../../utils';
import { debounce } from './utils';
import { PAGINATION_LIMIT } from '../../constants';
import styled from 'styled-components';
import { Loader } from '../../components';

const TransactionsContainer = ({ className }) => {
	const [transactions, setTransactions] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		request(
			`/transactions?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { transactions, lastPage } }) => {
			setTransactions(transactions);
			setLastPage(lastPage);
			setIsLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<div className="header">
				<h2>История операций</h2>
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				<ControlPanel />
			</div>
			<TransactionsList transactions={transactions} />
			{lastPage > 1 && transactions.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Transactions = styled(TransactionsContainer)`
	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
