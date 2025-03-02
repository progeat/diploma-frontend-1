import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAccountAsync } from '../../../store/actions';
import { selectAccount } from '../../../store/selectors';

export const useAccount = (idAccount) => {
	const { account, isLoading, error } = useSelector(selectAccount);
	const dispatch = useDispatch();

	const loadAccount = useCallback(
		(id) => {
			if (!account) {
				dispatch(loadAccountAsync(id));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);

	useEffect(() => {
		if (!idAccount) {
			return;
		}

		loadAccount(idAccount);
	}, [dispatch, loadAccount, idAccount]);

	return {
		idAccount,
		account,
		isLoading,
		error,
	};
};
