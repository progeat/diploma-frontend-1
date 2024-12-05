import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { Button, Input } from '../../components';
import { request } from '../../utils';
import styled from 'styled-components';

const transactionFormSchema = yup.object().shape({
	amount: yup.number().required('Введите сумму'),
	category: yup.object({ value: yup.string() }).required('Выберите категорию'),
	account: yup.object({ value: yup.string() }).required('Выберите счёт'),
	comment: yup
		.string()
		.required('Введите комментарий')
		.min(3, 'Неверно заполнен комментарий. Минимум 3 символа'),
});

const accountTypeOptions = [
	{ value: 0, label: 'Дебетовый' },
	{ value: 1, label: 'Кредитный' },
	{ value: 2, label: 'Вклад' },
	{ value: 3, label: 'Накопительный' },
	{ value: 4, label: 'Наличный' },
];

const createSelectorOptions = (arrayValues) =>
	arrayValues.map((obj) => ({ value: obj.id, label: obj.name }));

const TransactionContainer = ({ className }) => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			type: accountTypeOptions[0],
			balance: 0,
		},
		resolver: yupResolver(transactionFormSchema),
	});

	const [categories, setCategories] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [serverError, setServerError] = useState(null);

	useEffect(() => {
		Promise.all([request('/categories'), request('/accounts')]).then(
			([categoriesRes, accountsRes]) => {
				if (categoriesRes.error || accountsRes.error) {
					setServerError(categoriesRes.error || accountsRes.error);
					return;
				}

				setCategories(categoriesRes.data);
				setAccounts(accountsRes.data);
			},
		);
	}, []);

	console.log('Категории', categories);
	console.log('Счета', accounts);

	const onSubmit = ({ amount, category, account, comment }) => {
		request('/transactions', 'POST', {
			amount,
			category: category.value,
			account: account.value,
			comment,
		}).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			console.log('resp', data);
			// dispatch(setUser(user));
			reset();
		});
	};

	const formError =
		errors?.name?.message || errors?.type?.message || errors?.balance?.message;
	const errorMessage = formError || serverError;

	// TODO сброс значения для селекта после отправки формы
	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>Новая операция</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						placeholder="Сумма операции..."
						{...register('amount', {
							onChange: () => setServerError(null),
						})}
					/>
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								options={createSelectorOptions(categories)}
								// defaultValue={accountTypeOptions[0]}
								placeholder="Выберите категорию"
							/>
						)}
					/>
					<Controller
						name="account"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								options={createSelectorOptions(accounts)}
								// defaultValue={accountTypeOptions[0]}
								placeholder="Выберите счёт"
							/>
						)}
					/>
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
			</div>
		</div>
	);
};

export const Transaction = styled(TransactionContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		padding: 20px;
		background-color: #ddd;
	}

	& .form {
		display: flex;
		flex-direction: column;
	}

	& .form input {
		margin-bottom: 10px;
	}

	& .error {
		color: red;
	}
`;
