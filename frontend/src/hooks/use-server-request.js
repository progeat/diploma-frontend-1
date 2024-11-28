import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../bff';
import { selectUserSession } from '../selectors';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	// TODO подумать над реализацией доступа не зарегистрированных пользователей

	return useCallback(
		(operation, ...params) => {
			const request = ['fetchTransactions'].includes(operation)
				? params
				: [session, ...params];

			return server[operation](...request);
		},
		[session],
	);
};
