import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountSchema } from '../../../../../utils/validators';
import {
	CLOSE_MODAL,
	openModal,
	removeAccount,
	RESET_ACCOUNT_DATA,
	saveAccountAsync,
} from '../../../../../store/actions';
import { selectAccounts } from '../../../../../store/selectors';
import { request } from '../../../../../utils';
import { getTypeAccountEditedOption } from './helpers';
import { ACCOUNT_TYPE_OPTIONS } from '../constants';

export const useFormAccount = ({ idAccount, account }) => {
	const { accounts } = useSelector(selectAccounts);
	const [isServerPass, setIsServerPass] = useState(null);
	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const typeAccountEditedOption = getTypeAccountEditedOption(account);

	useEffect(() => {
		if (!idAccount) {
			return;
		}

		return () => {
			dispatch(RESET_ACCOUNT_DATA);
		};
	}, []);

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: account?.name || '',
			type: typeAccountEditedOption || ACCOUNT_TYPE_OPTIONS[0],
			balance: account?.balance || 0,
		},
		resolver: yupResolver(accountSchema),
	});

	const onSubmit = ({ name, type, balance }) => {
		try {
			dispatch(
				saveAccountAsync({
					id: idAccount,
					account: {
						name,
						type: type.value,
						balance,
					},
					isAccounts: !!accounts,
				}),
			);

			setIsServerPass(true);

			if (!idAccount) {
				reset();
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

	const resetFormMessage = () => {
		setServerError(null);
		setIsServerPass(null);
	};

	const formError =
		errors?.name?.message || errors?.type?.message || errors?.balance?.message;
	const errorMessage = formError || serverError;

	return {
		register,
		control,
		handleSubmit,
		onSubmit,
		onDeleteAccount,
		resetFormMessage,
		isServerPass,
		errorMessage,
	};
};
