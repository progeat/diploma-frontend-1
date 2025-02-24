import { request } from '../../utils';
import { setAccount } from './set-account';
import { updateAccount } from './update-account';

export const saveAccountAsync =
	(id, { name, type, balance }) =>
	(dispatch) => {
		request(`/accounts/${id || ''}`, `${id ? 'PATCH' : 'POST'}`, {
			name,
			type: type.value,
			balance,
		}).then(({ error, data }) => {
			if (error) {
				throw new Error(`Ошибка: ${error}`);
			}

			if (id) {
				dispatch(updateAccount(data));
			} else {
				dispatch(setAccount(data));
			}
		});
	};
