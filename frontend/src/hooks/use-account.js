import { useDispatch, useSelector } from 'react-redux';
import { loadAccountAsync, RESET_ACCOUNT_DATA } from '../store/actions';
import { selectAccount } from '../store/selectors';
import { useCallback, useEffect, useState } from 'react';

export const useAccount = (idAccount) => {
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const { account, isLoading, error } = useSelector(selectAccount);

	const loadAccount = useCallback(
		(id) => {
			if (!account) {
				dispatch(loadAccountAsync(id));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);

	const onSubmit = async (formData) => {
		try {
			const resData = await dispatch(saveAccountAsync(idAccount, formData));
		} catch (e) {
			setServerError(e.massage);
		}

		// request(`/accounts/${params.id || ''}`, `${params.id ? 'PATCH' : 'POST'}`, {
		// 	name,
		// 	type: type.value,
		// 	balance,
		// }).then(({ error, data }) => {
		// 	if (error) {
		// 		setServerError(`Ошибка запроса: ${error}`);
		// 		return;
		// 	}

		// 	setIsServerPass(true);
		// 	dispatch(updateAccounts);
		// 	if (!account) {
		// 		reset();
		// 	}
		// });
	};

	useEffect(() => {
		loadAccount(idAccount);

		return () => {
			dispatch(RESET_ACCOUNT_DATA);
		};
	}, [dispatch, loadAccount, idAccount]);

	return {
		account,
		isLoading,
		error,
		loadAccount,
		serverError,
	};
};
