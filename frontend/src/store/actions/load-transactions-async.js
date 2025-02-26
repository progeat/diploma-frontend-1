import { request } from '../../utils';
import { setLastPage } from './set-last-page';
import { setPage } from './set-page';
import { setTransactions } from './set-transactions';
import { setTransactionsIsLoading } from './set-transactions-is-loading';

export const loadTransactionsAsync =
	({ searchPhrase, page, transactionsLimitOnPage, dateRange, account, category }) =>
	(dispatch) => {
		dispatch(setTransactionsIsLoading(true));

		request(
			`/transactions?search=${searchPhrase}&page=${page}&limit=${transactionsLimitOnPage}&dateStart=${dateRange.start}&dateEnd=${dateRange.end}&account=${account}&category=${category}`,
		)
			.then(({ data: { transactions, lastPage } }) => {
				dispatch(setTransactions(transactions));
				dispatch(setLastPage(lastPage));

				if (page > lastPage) {
					dispatch(setPage(lastPage));
				}
			})
			.finally(() => {
				dispatch(setTransactionsIsLoading(false));
			});
	};
