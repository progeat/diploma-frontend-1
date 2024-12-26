import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import { Button, Icon, Input } from '../../../../components';
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

const TransactionFormContainer = ({
	className,
	transaction,
	transactionId,
	categories,
	accounts,
}) => {
	const [serverError, setServerError] = useState(null);
	const navigate = useNavigate();

	const categoriesOptions = createSelectorOptions(categories);
	const accountsOptions = createSelectorOptions(accounts);

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
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
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
							classNamePrefix="select"
							options={categoriesOptions}
							placeholder="Выберите категорию"
							isClearable
						/>
					)}
				/>
				<Icon
					className="icon-plus"
					id="fa-plus-circle"
					style={{ position: 'absolute', right: '-27px', top: '5px' }}
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
							classNamePrefix="select"
							options={accountsOptions}
							placeholder="Выберите счёт"
							isClearable
						/>
					)}
				/>
				<Icon
					className="icon-plus"
					id="fa-plus-circle"
					style={{ position: 'absolute', right: '-27px', top: '5px' }}
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
			<Button className="button-submit" type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
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

	& input:not(:first-child) {
		margin-bottom: 20px;
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

	& .select {
		margin-bottom: 10px;
		width: 100%;
	}

	& .select__control {
		height: 40px;
		border-radius: 8px;
		border-color: #5e636f;
	}

	& .select__control,
	.select__menu {
		background-color: #2b2d32;
	}

	& .select__placeholder,
	.select__single-value {
		color: #f8f8f9;
	}

	& .select__control:hover {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__control--is-focused {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__menu {
		z-index: 10;
	}

	& .select__option:hover,
	.select__option--is-focused {
		color: #2b2d32;
		background-color: #f8f8f9;
	}

	& .select__option--is-selected {
		color: #4d525f;
		background-color: rgb(179, 179, 179);
	}

	// & .icon-plus {
	// 	position: absolute;
	// 	top: 5px;
	// 	right: -27px;
	// 	color: #4d525f;
	// }

	// & .icon-plus:hover {
	// 	color: #f8f8f9;
	// }

	& .button-submit {
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

	& .error {
		color: red;
	}
`;
