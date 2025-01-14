import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { Button, Input } from '../../../../components';
import { request } from '../../../../utils';
import { GET_TYPE_ACCOUNT, TYPE_ACCOUNT } from '../../../../constants';
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
	{ value: TYPE_ACCOUNT.DEBIT, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.DEBIT] },
	{ value: TYPE_ACCOUNT.CREDIT, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.CREDIT] },
	{ value: TYPE_ACCOUNT.DEPOSIT, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.DEPOSIT] },
	{ value: TYPE_ACCOUNT.SAVINGS, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.SAVINGS] },
	{ value: TYPE_ACCOUNT.CASH, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.CASH] },
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
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
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
						classNamePrefix="select"
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
			<Button className="button-submit" type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
		</form>
	);
};

export const AccountsForm = styled(AccountsFormContainer)`
	display: flex;
	flex-direction: column;

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
`;
