import { request } from '../../utils';
import { setAccounts } from './set-accounts';
import { setAccountsError } from './set-accounts-error';
import { setAccountsIsLoading } from './set-accounts-is-loading';

export const loadAccountsAsync = (dispatch) => {
	dispatch(setAccountsIsLoading(true));

	request('/accounts')
		.then(({ data, error }) => {
			if (error) {
				dispatch(setAccountsError(error));

				return;
			}

			dispatch(setAccounts(data));
		})
		.finally(() => {
			dispatch(setAccountsIsLoading(false));
		});
};
