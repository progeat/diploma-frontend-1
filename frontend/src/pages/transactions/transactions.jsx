import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ControlPanel, Pagination, Search, TransactionsList } from './components';
import { selectFilter } from '../../store/selectors';
import { request } from '../../utils';
import { debounce } from './utils';
import { useTransactions } from '../../hooks';
import styled from 'styled-components';

// const getNumberLimitPage = (listHeight) => Math.floor(listHeight / 70);

const TransactionsContainer = ({ className }) => {
	// const [transactions, setTransactions] = useState([]);
	// const [transactionsOnPage, setTransactionsOnPage] = useState(null);
	// const [page, setPage] = useState(1);
	// const [lastPage, setLastPage] = useState(1);
	// const [searchPhrase, setSearchPhrase] = useState('');
	// const [isLoading, setIsLoading] = useState(false);
	// const filter = useSelector(selectFilter);
	// const { account, category, dateRange } = filter;
	// const transactionListRef = useRef(null);
	// const paginationRef = useRef(null);
	// const [triggerFlag, setTriggerFlag] = useState(false);
	const dataUseTransactions = useTransactions();
	const { transactions } = dataUseTransactions;

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	const listElement = transactionListRef.current;
	// 	const paginationElement = paginationRef.current;
	// 	let transactionsLimitOnPage = null;

	// 	if (listElement) {
	// 		// Если пагинация есть, то не вычитывать высоту, если нет, то учитывать высоту отсутствующей пагинации
	// 		const subtractedHeight = paginationElement ? 0 : 52;
	// 		const listHeight = listElement.clientHeight;
	// 		transactionsLimitOnPage = getNumberLimitPage(listHeight - subtractedHeight);
	// 		setTransactionsOnPage(transactionsLimitOnPage);
	// 	}

	// 	request(
	// 		`/transactions?search=${searchPhrase}&page=${page}&limit=${transactionsLimitOnPage}&dateStart=${dateRange.start}&dateEnd=${dateRange.end}&account=${account}&category=${category}`,
	// 	)
	// 		.then(({ data: { transactions, lastPage } }) => {
	// 			setTransactions(transactions);
	// 			setLastPage(lastPage);

	// 			if (page > lastPage) {
	// 				setPage(lastPage);
	// 			}
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false);
	// 		});
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [page, filter, triggerFlag]);

	// const startDelayedSearch = useMemo(() => debounce(setTriggerFlag, 2000), []);

	// const onSearch = ({ target }) => {
	// 	setSearchPhrase(target.value);
	// 	startDelayedSearch(!triggerFlag);
	// };

	return (
		<div className={className}>
			<div className="column-left">
				<h2>История операций</h2>
				<ControlPanel />
			</div>
			<div className="column-right">
				<div className="transactions-wrapper">
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
					<TransactionsList
						transactions={transactions}
						transactionsOnPage={transactionsOnPage}
						isLoading={isLoading}
						setTriggerFlag={setTriggerFlag}
						transactionListRef={transactionListRef}
					/>
					{lastPage > 1 && transactions.length > 0 && (
						<Pagination
							ref={paginationRef}
							page={page}
							lastPage={lastPage}
							setPage={setPage}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export const Transactions = styled(TransactionsContainer)`
	display: flex;
	height: 100%;
	padding: 30px;

	& .column-left,
	.column-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	& .column-left h2 {
		margin-bottom: 30px;
	}

	& .column-right {
		justify-content: space-between;
		width: 100%;
	}

	& .transactions-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 1200px;
		width: 100%;
		height: 100%;
		padding-left: 20px;
	}

	& .transactions-wrapper > div:not(:last-child) {
		margin-bottom: 20px;
	}
`;
