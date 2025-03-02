import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTransactionsAsync } from '../store/actions';
import { selectFilter, selectTransactions } from '../store/selectors';

// прибавляем к высоте листа компенсацию(10) отступа последней строки и делим на высоту(70) строки
const getNumberLimitPage = (listHeight) => Math.floor((listHeight + 10) / 70);

export const useTransactions = (transactionListRef, paginationRef) => {
	const { transactions, page, isLoading, error } = useSelector(selectTransactions);
	const [transactionsOnPage, setTransactionsOnPage] = useState(null);
	const filter = useSelector(selectFilter);
	const { account, category, dateRange, searchPhrase } = filter;
	const [requestFlag, setRequestFlag] = useState(false);
	const dispatch = useDispatch();
	const paginationElement = paginationRef?.current;

	useEffect(() => {
		const listElement = transactionListRef.current;
		let transactionsLimitOnPage = null;

		if (listElement) {
			const listHeight = listElement.clientHeight;
			transactionsLimitOnPage = getNumberLimitPage(listHeight);
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
	}, [page, filter, paginationElement, requestFlag]);

	const setFlag = () => {
		setRequestFlag(!requestFlag);
	};

	return {
		transactions,
		transactionsOnPage,
		setFlag,
		isLoading,
		error,
	};
};
