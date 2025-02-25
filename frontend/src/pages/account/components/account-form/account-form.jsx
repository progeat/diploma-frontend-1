import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '../../../../components/common';
import { SelectForm } from '../../../../components/form';
import { accountSchema } from '../../../../utils/validators';
import { ACCOUNT_TYPE_OPTIONS } from './constants';
import styled from 'styled-components';

const AccountFormContainer = ({
	className,
	account,
	accountError,
	isServerPass,
	onSubmitAccount,
	onDeleteAccount,
	resetServerStatus,
}) => {
	const indexTypeAccountEdited = ACCOUNT_TYPE_OPTIONS.findIndex(
		(option) => option.value === account?.type,
	);

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

	const formError =
		errors?.name?.message || errors?.type?.message || errors?.balance?.message;
	const errorMessage = formError || accountError;

	return (
		<form
			className={className}
			onSubmit={handleSubmit((formData) =>
				onSubmitAccount({ formData, resetForm: reset }),
			)}
		>
			<Input
				label="Имя"
				type="text"
				placeholder="Имя счёта..."
				{...register('name', {
					onChange: resetServerStatus,
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
					onChange: resetServerStatus,
				})}
			/>
			<Button className="button-submit" type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
			{isServerPass && <div className="pass">Отправленно</div>}
			{account && (
				<button className="delete-button" type="button" onClick={onDeleteAccount}>
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
