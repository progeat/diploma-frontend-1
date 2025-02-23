import { useDispatch, useSelector } from 'react-redux';
import { loadAccountsAsync } from '../store/actions';
import { selectAccounts } from '../store/selectors';

export const useAccounts = () => {
	const dispatch = useDispatch();
	const { accounts, isLoading, error } = useSelector(selectAccounts);

	const loadAccounts = () => {
		if (!accounts) {
			dispatch(loadAccountsAsync);
		}
	};

	return {
		accounts,
		isLoading,
		error,
		loadAccounts,
	};
};
