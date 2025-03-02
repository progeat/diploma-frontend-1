import { request } from '../../utils';
import { setAccountData } from './set-account-data';
import { setAccountError } from './set-account-error';
import { setAccountIsLoading } from './set-account-is-loading';
import { setAppError } from './set-app-error';

export const loadAccountAsync = (id) => (dispatch) => {
	request(`/accounts/${id}`)
		.then(({ data, error }) => {
			if (error) {
				dispatch(setAccountError(error));
				return;
			}

			dispatch(setAccountData(data));
		})
		.catch((error) => {
			dispatch(setAppError(error));
		})
		.finally(() => {
			dispatch(setAccountIsLoading(false));
		});
};
