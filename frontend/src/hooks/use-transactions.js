import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../utils';

const getNumberLimitPage = (listHeight) => Math.floor(listHeight / 70);

export const useTransactions = () => {
	const dispatch = useDispatch();
	const { transactions, isLoading, error } = useSelector(selectTransactions);
	const [transactionsOnPage, setTransactionsOnPage] = useState(null);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const filter = useSelector(selectFilter);
	const { account, category, dateRange } = filter;
	const [triggerFlag, setTriggerFlag] = useState(false);
	const transactionListRef = useRef(null);
	const paginationRef = useRef(null);

	// const loadTransactions = useCallback((searchPhrase, page, transactionsOnPage, dateRange, account, category) => {
	// 	dispatch(loadTransactionsAsync);
	// }, [dispatch]);

	useEffect(() => {
		const listElement = transactionListRef.current;
		const paginationElement = paginationRef.current;
		let transactionsLimitOnPage = null;

		if (listElement) {
			// Если пагинация есть, то не вычитывать высоту, если нет, то учитывать высоту отсутствующей пагинации
			const subtractedHeight = paginationElement ? 0 : 52;
			const listHeight = listElement.clientHeight;
			transactionsLimitOnPage = getNumberLimitPage(listHeight - subtractedHeight);
			setTransactionsOnPage(transactionsLimitOnPage);
		}

		dispatch(
			loadTransactionsAsync({
				searchPhrase,
				page,
				transactionsLimitOnPage,
				dateRange,
				account,
				category,
			}),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, filter, triggerFlag]);

	const startDelayedSearch = useMemo(() => debounce(setTriggerFlag, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!triggerFlag);
	};

	return {
		transactions,
		transactionsOnPage,
		onSearch,
		isLoading,
		error,
	};
};
