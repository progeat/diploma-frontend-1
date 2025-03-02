import { Button, Input } from '../../../../components/common';
import { SelectForm } from '../../../../components/form';
import { ACCOUNT_TYPE_OPTIONS } from './constants';
import { useFormAccount } from './hooks';
import styled from 'styled-components';

const AccountFormContainer = ({ className, account, idAccount }) => {
	const {
		register,
		control,
		handleSubmit,
		onSubmit,
		onDeleteAccount,
		resetFormMessage,
		isServerPass,
		errorMessage,
	} = useFormAccount({ idAccount, account });

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Имя"
				type="text"
				placeholder="Имя счёта..."
				{...register('name', {
					onChange: resetFormMessage,
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
					onChange: resetFormMessage,
				})}
			/>
			<Button className="button-submit" type="submit" disabled={!!errorMessage}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
			{isServerPass && <div className="pass">Отправленно</div>}
			{idAccount && (
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
