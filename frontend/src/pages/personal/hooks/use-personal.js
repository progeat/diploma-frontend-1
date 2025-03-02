import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/actions';
import { request } from '../../../utils';

export const usePersonal = () => {
	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		request('/user')
			.then(({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [dispatch]);

	return {
		isLoading,
		serverError,
	};
};
