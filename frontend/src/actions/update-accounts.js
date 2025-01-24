import { request } from '../utils';
import { setAccounts } from './set-accounts';

export const updateAccounts = async (dispatch) => {
	request('/accounts').then(({ data }) => {
		dispatch(setAccounts(data));
	});
};
