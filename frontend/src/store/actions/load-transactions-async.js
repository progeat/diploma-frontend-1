import { request } from '../../utils';
import { setAccounts } from './set-accounts';
import { setAccountsError } from './set-accounts-error';
import { setAccountsIsLoading } from './set-accounts-is-loading';

export const loadTransactionsAsync =
	({ searchPhrase, page, dateRange, account, category }) =>
	(dispatch) => {
		dispatch(setTransactionsIsLoading(true));

		request(
			`/transactions?search=${searchPhrase}&page=${page}&limit=${transactionsLimitOnPage}&dateStart=${dateRange.start}&dateEnd=${dateRange.end}&account=${account}&category=${category}`,
		)
			.then(({ data: { transactions, lastPage } }) => {
				setTransactions(transactions);
				setLastPage(lastPage);

				if (page > lastPage) {
					setPage(lastPage);
				}
			})
			.finally(() => {
				dispatch(setTransactionsIsLoading(false));
			});

		// dispatch(setAccountsIsLoading(true));

		// request('/accounts')
		// 	.then(({ data, error }) => {
		// 		if (error) {
		// 			dispatch(setAccountsError(error));

		// 			return;
		// 		}

		// 		dispatch(setAccounts(data));
		// 	})
		// 	.finally(() => {
		// 		dispatch(setAccountsIsLoading(false));
		// 	});
	};
