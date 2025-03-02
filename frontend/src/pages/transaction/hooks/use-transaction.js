import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccounts, useCategories } from '../../../hooks';
import {
	loadTransactionAsync,
	RESET_TRANSACTION_DATA,
	setTransactionIsLoading,
} from '../../../store/actions';
import { selectTransaction } from '../../../store/selectors';

export const useTransaction = (idTransaction) => {
	const { transaction, isLoading, error } = useSelector(selectTransaction);
	const {
		categories,
		isLoading: isLoadingCategories,
		error: errorCategories,
	} = useCategories();
	const {
		accounts,
		isLoading: isLoadingAccounts,
		error: errorAccounts,
	} = useAccounts();
	const dispatch = useDispatch();

	const loadTransaction = useCallback(
		(id) => {
			if (!transaction) {
				dispatch(loadTransactionAsync(id));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);

	useEffect(() => {
		if (!idTransaction) {
			dispatch(setTransactionIsLoading(false));

			return;
		}

		loadTransaction(idTransaction);

		return () => {
			dispatch(RESET_TRANSACTION_DATA);
		};
	}, [dispatch, loadTransaction, idTransaction]);

	return {
		idTransaction,
		transaction,
		accounts,
		categories,
		isLoading: isLoading || isLoadingAccounts || isLoadingCategories,
		error: error || errorAccounts || errorCategories,
	};
};
