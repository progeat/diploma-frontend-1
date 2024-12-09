import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { Button, Input } from '../../../../components';
import { request } from '../../../../utils';
import styled from 'styled-components';

const accountFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните название')
		.min(3, 'Неверно заполнено название. Минимум 3 символа'),
	type: yup.object({ value: yup.number() }).required('Выберите тип счёта'),
	balance: yup.number().required('Введите сумму баланса'),
});

// TODO вынести в константу
const accountTypeOptions = [
	{ value: 0, label: 'Дебетовый' },
	{ value: 1, label: 'Кредитный' },
	{ value: 2, label: 'Вклад' },
	{ value: 3, label: 'Накопительный' },
	{ value: 4, label: 'Наличный' },
];

// TODO поработать над ошибками
const AccountsFormContainer = ({ className, accounts }) => {
	const [serverError, setServerError] = useState(null);
	const params = useParams();
	const accountEditing = accounts.find((account) => account.id === params.id);

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: accountEditing?.name || '',
			type: accountTypeOptions[accountEditing?.type] || accountTypeOptions[0],
			balance: accountEditing?.balance || 0,
		},
		resolver: yupResolver(accountFormSchema),
	});

	const onSubmit = ({ name, type, balance }) => {
		request(`/accounts/${params.id || ''}`, `${params.id ? 'PATCH' : 'POST'}`, {
			name,
			type: type.value,
			balance,
		}).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			console.log('resp', data);

			// TODO отправить данные на стор
			// dispatch(setAccount(data));
			if (!accountEditing) {
				reset();
			}
		});
	};

	const formError =
		errors?.name?.message || errors?.type?.message || errors?.balance?.message;
	const errorMessage = formError || serverError;

	return (
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
						className="select"
						options={accountTypeOptions}
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
	);
};

export const AccountsForm = styled(AccountsFormContainer)``;
