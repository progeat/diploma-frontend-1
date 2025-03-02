import { request } from '../../utils';
import { loadAccountsAsync } from './load-accounts-async';
import { setAccount } from './set-account';
import { setAccountError } from './set-account-error';
import { setAppError } from './set-app-error';
import { updateAccount } from './update-account';

export const saveAccountAsync =
	({ id, account, isAccounts }) =>
	async (dispatch) => {
		try {
			if (!isAccounts) {
				await dispatch(loadAccountsAsync);
			}

			const { error, data } = await request(
				`/accounts/${id || ''}`,
				`${id ? 'PATCH' : 'POST'}`,
				account,
			);

			if (error) {
				throw new Error(`Ошибка: ${error}`);
			}

			if (id) {
				dispatch(updateAccount(data));
			} else {
				dispatch(setAccount(data));
			}
		} catch (error) {
			dispatch(setAccountError(error));
			dispatch(setAppError(error));
		}
	};
