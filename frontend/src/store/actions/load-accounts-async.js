import { request } from '../../utils';
import { setAccounts } from './set-accounts';
import { setAccountsIsLoading } from './set-accounts-is-loading';
import { setAppError } from './set-app-error';

export const loadAccountsAsync = async (dispatch) => {
	dispatch(setAccountsIsLoading(true));

	try {
		const { data, error } = await request('/accounts');

		if (error) {
			throw new Error(`Ошибка: ${error}`);
		}

		dispatch(setAccounts(data));
	} catch (error) {
		dispatch(setAppError(error));
	} finally {
		dispatch(setAccountsIsLoading(false));
	}
};
