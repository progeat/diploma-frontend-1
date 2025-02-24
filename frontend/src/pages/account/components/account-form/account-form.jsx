import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../../components/common';
import { SelectForm } from '../../../../components/form';
import { request } from '../../../../utils';
import { CLOSE_MODAL, openModal, updateAccounts } from '../../../../store/actions';
import { accountSchema } from '../../../../utils/validators';
import { GET_TYPE_ACCOUNT, TYPE_ACCOUNT } from '../../../../constants';
import styled from 'styled-components';

const ACCOUNT_TYPE_OPTIONS = [
	{ value: TYPE_ACCOUNT.DEBIT, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.DEBIT] },
	{ value: TYPE_ACCOUNT.CREDIT, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.CREDIT] },
	{ value: TYPE_ACCOUNT.DEPOSIT, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.DEPOSIT] },
	{ value: TYPE_ACCOUNT.SAVINGS, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.SAVINGS] },
	{ value: TYPE_ACCOUNT.CASH, label: GET_TYPE_ACCOUNT[TYPE_ACCOUNT.CASH] },
];

const AccountFormContainer = ({ className, account }) => {
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const indexTypeAccountEdited = ACCOUNT_TYPE_OPTIONS.findIndex(
		(option) => option.value === account?.type,
	);
	const params = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: account?.name || '',
			type: ACCOUNT_TYPE_OPTIONS[indexTypeAccountEdited] || ACCOUNT_TYPE_OPTIONS[0],
			balance: account?.balance || 0,
		},
		resolver: yupResolver(accountSchema),
	});

	// const onSubmit = ({ name, type, balance }) => {
	// 	request(`/accounts/${params.id || ''}`, `${params.id ? 'PATCH' : 'POST'}`, {
	// 		name,
	// 		type: type.value,
	// 		balance,
	// 	}).then(({ error, data }) => {
	// 		if (error) {
	// 			setServerError(`Ошибка запроса: ${error}`);
	// 			return;
	// 		}

	// 		setIsServerPass(true);
	// 		dispatch(updateAccounts);
	// 		if (!account) {
	// 			reset();
	// 		}
	// 	});
	// };

	const onDeleteAccount = (id) => {
		dispatch(
			openModal({
				text: 'Удалить счёт?',
				onConfirm: () => {
					request(`/accounts/${id}`, 'DELETE').then(() => {
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
		errors?.name?.message || errors?.type?.message || errors?.balance?.message;
	const errorMessage = formError || serverError;

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Имя"
				type="text"
				placeholder="Имя счёта..."
				{...register('name', {
					onChange: () => {
						setServerError(null);
						setIsServerPass(null);
					},
				})}
			/>
			<SelectForm
				label="Тип"
				name="type"
				control={control}
				options={ACCOUNT_TYPE_OPTIONS}
				placeholder="Выберите тип счёта"
			/>
			<Input
				label="Баланс"
				type="number"
				placeholder="Баланс..."
				{...register('balance', {
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
			{account && (
				<button
					className="delete-button"
					type="button"
					onClick={() => onDeleteAccount(params.id)}
				>
					Удалить счёт
				</button>
			)}
		</form>
	);
};

export const AccountForm = styled(AccountFormContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;

	& input {
		margin-bottom: 10px;
		border-radius: 8px;
		border-color: #5e636f;
		color: #f8f8f9;
	}

	& input:hover {
		outline: 2px solid #f8f8f9;
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
