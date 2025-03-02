import { request } from '../../utils';
import { setAccountIsLoading } from './set-account-is-loading';
import { setAccounts } from './set-accounts';
import { setAppError } from './set-app-error';

export const updateAccounts = async (dispatch) => {
	dispatch(setAccountIsLoading(true));

	try {
		const { data } = await request('/accounts');

		dispatch(setAccounts(data));
		dispatch(setAccountIsLoading(false));
	} catch (error) {
		dispatch(setAppError(error));
	}
};
