import { request } from '../../utils';
import { RESET_STATISTICS } from './reset-statistics';
import { setAppError } from './set-app-error';
import { setTransactionData } from './set-transaction-data';
import { updateAccounts } from './update-accounts';

export const saveTransactionAsync =
	({ id, transaction }) =>
	async (dispatch) => {
		try {
			const { error, data } = await request(
				`/transactions/${id || ''}`,
				`${id ? 'PATCH' : 'POST'}`,
				transaction,
			);

			if (error) {
				throw new Error(`Ошибка: ${error}`);
			}

			dispatch(setTransactionData(data));
			dispatch(updateAccounts);
			dispatch(RESET_STATISTICS);
		} catch (error) {
			dispatch(setAppError(error));
		}
	};
