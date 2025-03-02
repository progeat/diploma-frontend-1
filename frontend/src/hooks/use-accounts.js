import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAccountsAsync } from '../store/actions';
import { selectAccounts } from '../store/selectors';

export const useAccounts = () => {
	const dispatch = useDispatch();
	const { accounts, isLoading, error } = useSelector(selectAccounts);

	const loadAccounts = useCallback(() => {
		dispatch(loadAccountsAsync);
	}, [dispatch]);

	useEffect(() => {
		if (!accounts) {
			loadAccounts();
		}
	}, [loadAccounts, accounts]);

	return {
		accounts,
		isLoading,
		error,
	};
};
