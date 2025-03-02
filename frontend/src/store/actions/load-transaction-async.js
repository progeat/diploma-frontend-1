import { request } from '../../utils';
import { setAppError } from './set-app-error';
import { setTransactionData } from './set-transaction-data';
import { setTransactionError } from './set-transaction-error';
import { setTransactionIsLoading } from './set-transaction-is-loading';

export const loadTransactionAsync = (id) => (dispatch) => {
	request(`/transactions/${id}`)
		.then(({ data, error }) => {
			if (error) {
				dispatch(setTransactionError(error));

				return;
			}

			dispatch(setTransactionData(data));
		})
		.catch((error) => {
			dispatch(setAppError(error));
		})
		.finally(() => {
			dispatch(setTransactionIsLoading(false));
		});
};
