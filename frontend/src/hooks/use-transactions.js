import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoriesAsync } from '../store/actions';
import { selectCategories } from '../store/selectors';

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
	const transactionListRef = useRef(null);
	const paginationRef = useRef(null);

	// const loadTransactions = useCallback((searchPhrase, page, transactionsOnPage, dateRange, account, category) => {
	// 	dispatch(loadTransactionsAsync);
	// }, [dispatch]);

	useEffect(() => {
		setIsLoading(true);
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
				dateRange,
				account,
				category,
			}),
		);

		// request(
		// 	`/transactions?search=${searchPhrase}&page=${page}&limit=${transactionsLimitOnPage}&dateStart=${dateRange.start}&dateEnd=${dateRange.end}&account=${account}&category=${category}`,
		// )
		// 	.then(({ data: { transactions, lastPage } }) => {
		// 		setTransactions(transactions);
		// 		setLastPage(lastPage);

		// 		if (page > lastPage) {
		// 			setPage(lastPage);
		// 		}
		// 	})
		// 	.finally(() => {
		// 		setIsLoading(false);
		// 	});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, filter, triggerFlag]);

	const startDelayedSearch = useMemo(() => debounce(setTriggerFlag, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!triggerFlag);
	};

	// useEffect(() => {
	// 	if (!categories) {
	// 		loadCategories();
	// 	}
	// }, [loadCategories, categories]);

	return {
		transactions,
		isLoading,
		error,
	};
};
