import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { Button, Input } from '../../components';
import styled from 'styled-components';
import { request } from '../../utils';

const accountFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните название')
		.min(3, 'Неверно заполнено название. Минимум 3 символа'),
	type: yup.object({ value: yup.number() }).required('Выберите тип счёта'),
	balance: yup.number().required('Введите сумму баланса'),
});

const accountTypeOptions = [
	{ value: 0, label: 'Дебетовый' },
	{ value: 1, label: 'Кредитный' },
	{ value: 2, label: 'Вклад' },
	{ value: 3, label: 'Накопительный' },
	{ value: 4, label: 'Наличный' },
];

// TODO доработать валидацию и вывод значения селекта
const AccountsContainer = ({ className }) => {
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
		resolver: yupResolver(accountFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ name, type, balance }) => {
		// console.log('name', name);
		// console.log('type', type.value);
		// console.log('balance', balance);
		request('/accounts', 'POST', { name, type: type.value, balance }).then(
			({ error, data }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				console.log('resp', data);
				// dispatch(setUser(user));
				reset();
			},
		);
	};

	const formError =
		errors?.name?.message || errors?.type?.message || errors?.balance?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>Новый счёт</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						placeholder="Название счёта..."
						{...register('name', {
							onChange: () => setServerError(null),
						})}
					/>
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								options={accountTypeOptions}
								// defaultValue={accountTypeOptions[0]}
								placeholder="Выберите тип счёта"
							/>
						)}
					/>
					<Input
						type="number"
						placeholder="Баланс..."
						{...register('balance', {
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

export const Accounts = styled(AccountsContainer)`
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
