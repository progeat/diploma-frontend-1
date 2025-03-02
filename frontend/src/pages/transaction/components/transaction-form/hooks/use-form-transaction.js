import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { transactionSchema } from '../../../../../utils/validators';
import {
	CLOSE_MODAL,
	openModal,
	RESET_STATISTICS,
	RESET_TRANSACTION_DATA,
	saveTransactionAsync,
	updateAccounts,
} from '../../../../../store/actions';
import {
	createAccountsSelectOptions,
	createCategoriesSelectOptions,
	findIndexForSelect,
	getCategoryType,
	getIndexActive,
	getValueDate,
} from './helpers';
import { request } from '../../../../../utils';

export const useFormTransaction = ({
	idTransaction,
	transaction,
	categories,
	accounts,
}) => {
	const valueIndexActive = getIndexActive(transaction);
	const valueDate = getValueDate(transaction);
	const [indexActive, setIndexActive] = useState(valueIndexActive);
	const [startDate, setStartDate] = useState(valueDate);

	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const categoriesOptions = createCategoriesSelectOptions(categories, indexActive);
	const accountsOptions = createAccountsSelectOptions(accounts);

	const indexSelectForCategory = findIndexForSelect(
		transaction?.category,
		categoriesOptions,
	);
	const indexSelectForAccount = findIndexForSelect(
		transaction?.account,
		accountsOptions,
	);

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			amount: transaction?.amount || 0,
			categorySelected: categoriesOptions[indexSelectForCategory] || null,
			accountSelected: accountsOptions[indexSelectForAccount] || null,
			comment: transaction?.comment || '',
		},
		resolver: yupResolver(transactionSchema),
	});

	const onSubmit = async ({ amount, categorySelected, accountSelected, comment }) => {
		try {
			setServerError(null);

			const categoryType = getCategoryType(categories, categorySelected);

			dispatch(
				saveTransactionAsync({
					id: idTransaction,
					transaction: {
						type: categoryType,
						amount,
						category: categorySelected.value,
						account: accountSelected.value,
						transactionAt: startDate,
						comment,
					},
				}),
			);

			setIsServerPass(true);
			if (!idTransaction) {
				reset();
			}
		} catch (error) {
			setServerError(`Ошибка запроса: ${error.message}`);
		}
	};

	const onToggleActive = (index) => {
		reset({ ['categorySelected']: null });
		setIndexActive(index);
	};

	const onDeleteTransaction = () => {
		dispatch(
			openModal({
				text: 'Удалить операцию?',
				onConfirm: () => {
					request(`/transactions/${idTransaction}`, 'DELETE').then(() => {
						dispatch(updateAccounts);
						dispatch(RESET_STATISTICS);
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

	useEffect(() => {
		return () => {
			dispatch(RESET_TRANSACTION_DATA);
		};
	}, []);

	const formError =
		(errors?.amount?.message && 'Введите положительное число') ||
		errors?.categorySelected?.message ||
		errors?.accountSelected?.message ||
		errors?.comment?.message;

	const errorMessage = formError || serverError;

	return {
		indexActive,
		categoriesOptions,
		accountsOptions,
		startDate,
		setStartDate,
		onToggleActive,
		register,
		control,
		handleSubmit,
		onSubmit,
		onDeleteTransaction,
		resetFormMessage,
		isServerPass,
		errorMessage,
		formError,
	};
};
