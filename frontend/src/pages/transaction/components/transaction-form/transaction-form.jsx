import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Icon, Input } from '../../../../components/common';
import { SelectForm } from '../../../../components/form';
import { request } from '../../../../utils';
import { transactionSchema } from '../../../../utils/validators';
import { CLOSE_MODAL, openModal, updateAccounts } from '../../../../store/actions';
import { createSelectOptions, findIndexForSelect } from './utils';
import styled from 'styled-components';

const TransactionFormContainer = ({
	className,
	transaction,
	transactionId,
	categories,
	accounts,
}) => {
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const categoriesOptions = createSelectOptions(categories);
	const accountsOptions = createSelectOptions(accounts);

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

	// TODO если ошибка прилетела с сервера, то при повторной отправке формы обнулять ошибку перед запросом(в других формах тоже подправить)
	const onSubmit = ({ amount, categorySelected, accountSelected, comment }) => {
		setServerError(null);

		const categoryType = categories.find(
			(category) => category.id === categorySelected.value,
		).type;

		request(
			`/transactions/${transactionId || ''}`,
			`${transactionId ? 'PATCH' : 'POST'}`,
			{
				type: categoryType,
				amount,
				category: categorySelected.value,
				account: accountSelected.value,
				comment,
			},
		).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			setIsServerPass(true);
			dispatch(updateAccounts);
			if (!transactionId) {
				reset();
			}
		});
	};

	const onDeleteTransaction = (id) => {
		dispatch(
			openModal({
				text: 'Удалить операцию?',
				onConfirm: () => {
					request(`/transactions/${id}`, 'DELETE').then(() => {
						dispatch(updateAccounts);
						navigate(-1);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const formError =
		(errors?.amount?.message && 'Введите сумму') ||
		errors?.categorySelected?.message ||
		errors?.accountSelected?.message ||
		errors?.comment?.message;

	const errorMessage = formError || serverError;

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Сумма"
				type="number"
				placeholder="Сумма операции..."
				{...register('amount', {
					onChange: () => {
						setServerError(null);
						setIsServerPass(null);
					},
				})}
			/>
			<div className="select-wrapper">
				<SelectForm
					label="Категория"
					name="categorySelected"
					control={control}
					options={categoriesOptions}
					placeholder="Выберите категорию"
					isClearable
				/>
				<Icon
					className="icon-plus"
					id="fa-plus-circle"
					style={{ position: 'absolute', right: '-27px', top: '27px' }}
					margin="0"
					onClick={() => navigate('/category')}
				/>
			</div>
			<div className="select-wrapper">
				<SelectForm
					label="Счёт"
					name="accountSelected"
					control={control}
					options={accountsOptions}
					placeholder="Выберите счёт"
					isClearable
				/>
				<Icon
					className="icon-plus"
					id="fa-plus-circle"
					style={{ position: 'absolute', right: '-27px', top: '27px' }}
					margin="0"
					onClick={() => navigate('/account')}
				/>
			</div>
			<Input
				label="Комментарий"
				type="text"
				placeholder="Комментарий..."
				{...register('comment', {
					onChange: () => {
						setServerError(null);
						setIsServerPass(null);
					},
				})}
			/>
			<Button className="button-submit" type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
			{isServerPass && <div className="pass">Отправленно</div>}
			{transactionId && (
				<button
					className="delete-button"
					type="button"
					onClick={() => onDeleteTransaction(transactionId)}
				>
					Удалить операцию
				</button>
			)}
		</form>
	);
};

export const TransactionForm = styled(TransactionFormContainer)`
	display: flex;
	flex-direction: column;
	min-width: 220px;

	& input {
		margin-bottom: 10px;
		border-radius: 8px;
		border-color: #5e636f;
		color: #f8f8f9;
	}

	& input:hover {
		outline: 2px solid #f8f8f9;
	}

	& .select-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& .button-submit {
		margin: 10px 0;
		height: 38px;
		border: 1px solid #f8f8f9;
		border-radius: 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .button-submit:hover {
		color: #000;
		background-color: #f8f8f9;
	}

	& .delete-button {
		text-align: left;
		width: max-content;
		border: 0;
		color: rgb(156, 156, 156);
		background-color: inherit;
		cursor: pointer;
	}

	& .delete-button:hover {
		color: #f8f8f9;
	}

	& .pass {
		color: #6ccb81;
	}

	& .error {
		color: rgb(203, 108, 108);
	}
`;
