import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import { Button, Icon, Input } from '../../../../components';
import { selectAccounts, selectCategories } from '../../../../selectors';
import { request } from '../../../../utils';
import styled from 'styled-components';

const transactionFormSchema = yup.object().shape({
	amount: yup.number().required('Введите сумму'),
	category: yup.object({ value: yup.string() }).required('Выберите категорию'),
	account: yup.object({ value: yup.string() }).required('Выберите счёт'),
	comment: yup
		.string()
		.required('Введите комментарий')
		.min(2, 'Неверно заполнен комментарий. Минимум 2 символа'),
});

// TODO отрефакторить и посмотреть что можно декомпозировать
const createSelectorOptions = (arrayValues) =>
	arrayValues.map((obj) => ({ value: obj.id, label: obj.name }));

const findIndexForSelect = (id, options) =>
	options.findIndex((option) => option.value === id);

// TODO разобраться с подгрузкой категорий и счетов при обновлении страницы во время редактирования операции
const TransactionFormContainer = ({ className, transaction, transactionId }) => {
	const [serverError, setServerError] = useState(null);
	const navigate = useNavigate();
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	const categoriesOptions = createSelectorOptions(categories);
	const accountsOptions = createSelectorOptions(accounts);

	const indexSelectForCategory = findIndexForSelect(
		transaction?.category,
		categoriesOptions,
	);
	const indexSelectForAccount = findIndexForSelect(
		transaction.account,
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
			category: categoriesOptions[indexSelectForCategory] || null,
			account: accountsOptions[indexSelectForAccount] || null,
			comment: transaction?.comment || '',
		},
		resolver: yupResolver(transactionFormSchema),
	});

	const onSubmit = ({ amount, category, account, comment }) => {
		request(
			`/transactions/${transactionId || ''}`,
			`${transactionId ? 'PATCH' : 'POST'}`,
			{
				amount,
				category: category.value,
				account: account.value,
				comment,
			},
		).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			console.log('resp', data);
			if (!transactionId) {
				reset();
			}
		});
	};

	const formError =
		errors?.name?.message || errors?.type?.message || errors?.balance?.message;
	const errorMessage = formError || serverError;

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<Input
				type="number"
				placeholder="Сумма операции..."
				{...register('amount', {
					onChange: () => setServerError(null),
				})}
			/>
			<div className="select-wrapper">
				<Controller
					name="category"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							className="select"
							// defaultValue={categoriesOptions[0]}
							options={categoriesOptions}
							placeholder="Выберите категорию"
							isClearable
						/>
					)}
				/>
				<Icon
					id="fa-plus-circle"
					style={{ position: 'absolute', right: '-27px', top: '4px' }}
					margin="0"
					onClick={() => navigate('/categories')}
				/>
			</div>
			<div className="select-wrapper">
				<Controller
					name="account"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							className="select"
							options={accountsOptions}
							// defaultValue={accountTypeOptions[0]}
							placeholder="Выберите счёт"
							isClearable
						/>
					)}
				/>
				<Icon
					id="fa-plus-circle"
					style={{ position: 'absolute', right: '-27px', top: '4px' }}
					margin="0"
					onClick={() => navigate('/accounts')}
				/>
			</div>
			<Input
				type="text"
				placeholder="Комментарий..."
				{...register('comment', {
					onChange: () => setServerError(null),
				})}
			/>
			<Button type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
		</form>
	);
};

export const TransactionForm = styled(TransactionFormContainer)``;
