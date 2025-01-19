import { request } from '../utils';
import { setAccounts } from './set-accounts';

export const updateAccounts = async (dispatch) => {
	request('/accounts').then(({ data }) => {
		console.log('updateAccounts', data);
		dispatch(setAccounts(data));
	});
};
