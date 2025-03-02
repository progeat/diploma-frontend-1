import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import { Button, Icon, Input, TabSwitcher } from '../../../../components/common';
import { SelectForm } from '../../../../components/form';
import { useFormTransaction } from './hooks';
import { NAMES_TYPES_CATEGORY } from '../../../../constants';
import styled from 'styled-components';

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-size: 14px;
	color: #cfcfcf;
`;

const TransactionFormContainer = ({
	className,
	idTransaction,
	transaction,
	categories,
	accounts,
}) => {
	const {
		indexActive,
		categoriesOptions,
		accountsOptions,
		startDate,
		setStartDate,
		onToggleActive,
		register,
		control,
		handleSubmit,
		onSubmit,
		onDeleteTransaction,
		resetFormMessage,
		isServerPass,
		errorMessage,
		formError,
	} = useFormTransaction({ idTransaction, transaction, categories, accounts });
	const navigate = useNavigate();

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div className="switcher-wrapper">
				<TabSwitcher
					className="switcher"
					names={NAMES_TYPES_CATEGORY}
					indexActive={indexActive}
					onToggleActive={onToggleActive}
				/>
			</div>
			<Input
				label="Сумма"
				type="number"
				placeholder="Сумма операции..."
				{...register('amount', {
					onChange: resetFormMessage,
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
			<Label>Дата и время</Label>
			<DatePicker
				selected={startDate}
				onChange={setStartDate}
				timeFormat="HH:mm"
				timeIntervals={15}
				dateFormat="dd MMMM yyyy HH:mm"
				locale={ru}
				showTimeInput
				timeInputLabel="Время"
			/>
			<Input
				label="Комментарий"
				type="text"
				placeholder="Комментарий..."
				{...register('comment', {
					onChange: resetFormMessage,
				})}
			/>
			<Button className="button-submit" type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
			{isServerPass && <div className="pass">Отправленно</div>}
			{idTransaction && (
				<button
					className="delete-button"
					type="button"
					onClick={onDeleteTransaction}
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

	& .switcher-wrapper {
		margin-bottom: 10px;
	}

	& .switcher {
		justify-content: center;
	}

	& > input {
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

	& .react-datepicker {
		border-radius: 8px;
		border-color: #a3a3a3;
		background-color: #2b2d32;
	}

	& .react-datepicker__input-container input {
		text-align: center;
		margin-bottom: 10px;
		width: 100%;
		border-radius: 8px;
		border: 1px solid #5e636f;
		padding: 10px;
		font-size: 15px;
		font-weight: normal;
		line-height: 0;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .react-datepicker-time__caption {
		color: #cfcfcf;
	}

	& .react-datepicker-time__input-container input {
		margin: 0;
		padding: 3px 6px;
		width: 100%;
		border-radius: 8px;
		border: 1px solid #5e636f;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .react-datepicker .react-datepicker__month-container,
	.react-datepicker .react-datepicker__header {
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .react-datepicker__current-month,
	.react-datepicker__day-name,
	.react-datepicker__day {
		color: #f8f8f9;
	}

	& .react-datepicker__day--today {
		color: #61cfa7;
	}

	& .react-datepicker__day:hover {
		color: #2b2d32;
	}

	& .react-datepicker__day--keyboard-selected {
		color: #2b2d32;
		background-color: #61cfa7;
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
