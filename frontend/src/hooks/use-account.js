import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	loadAccountAsync,
	loadAccountsAsync,
	openModal,
	removeAccount,
	RESET_ACCOUNT_DATA,
	saveAccountAsync,
} from '../store/actions';
import { request } from '../utils';
import { selectAccount, selectAccounts } from '../store/selectors';

export const useAccount = (idAccount) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const { account, isLoading, error } = useSelector(selectAccount);
	const { accounts } = useSelector(selectAccounts);

	const loadAccount = useCallback(
		(id) => {
			if (!account) {
				dispatch(loadAccountAsync(id));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch],
	);

	const onSubmitAccount = ({ formData, resetForm }) => {
		try {
			if (!accounts) {
				dispatch(loadAccountsAsync);
			}

			dispatch(saveAccountAsync(idAccount, formData));

			setIsServerPass(true);

			if (!idAccount) {
				resetForm();
			}
		} catch (e) {
			setServerError(e.massage);
		}
	};

	const onDeleteAccount = () => {
		dispatch(
			openModal({
				text: 'Удалить счёт?',
				onConfirm: () => {
					request(`/accounts/${idAccount}`, 'DELETE').then(() => {
						dispatch(removeAccount(idAccount));
						navigate(-1);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const resetServerStatus = () => {
		setServerError(null);
		setIsServerPass(null);
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
		serverError: error,
		onSubmitAccount,
		onDeleteAccount,
		serverError,
		isServerPass,
		resetServerStatus,
	};
};
