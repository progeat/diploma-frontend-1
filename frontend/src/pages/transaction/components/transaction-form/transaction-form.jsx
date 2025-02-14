import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import { Button, Icon, Input, TabSwitcher } from '../../../../components/common';
import { SelectForm } from '../../../../components/form';
import { request } from '../../../../utils';
import { transactionSchema } from '../../../../utils/validators';
import { CLOSE_MODAL, openModal, updateAccounts } from '../../../../store/actions';
import {
	createAccountsSelectOptions,
	createCategoriesSelectOptions,
	findIndexForSelect,
} from './utils';
import { NAMES_TYPES_CATEGORY, TYPE_CATEGORY } from '../../../../constants';
import styled from 'styled-components';

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-size: 14px;
	color: #cfcfcf;
`;

// TODO завершить процесс внедрения таба
const TransactionFormContainer = ({
	className,
	transaction,
	transactionId,
	categories,
	accounts,
}) => {
	const [indexActive, setIndexActive] = useState(
		transaction?.type === TYPE_CATEGORY.INCOME ? 1 : 0,
	);
	const [startDate, setStartDate] = useState(new Date());
	const [serverError, setServerError] = useState(null);
	const [isServerPass, setIsServerPass] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const categoriesOptions = createCategoriesSelectOptions(categories, indexActive);
	const accountsOptions = createAccountsSelectOptions(accounts);

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
			categorySelected: categoriesOptions[indexSelectForCategory] || null,
			accountSelected: accountsOptions[indexSelectForAccount] || null,
			comment: transaction?.comment || '',
		},
		resolver: yupResolver(transactionSchema),
	});

	// TODO если ошибка прилетела с сервера, то при повторной отправке формы обнулять ошибку перед запросом(в других формах тоже подправить)
	const onSubmit = ({ amount, categorySelected, accountSelected, comment }) => {
		setServerError(null);

		const categoryType = categories.find(
			(category) => category.id === categorySelected.value,
		).type;

		request(
			`/transactions/${transactionId || ''}`,
			`${transactionId ? 'PATCH' : 'POST'}`,
			{
				type: categoryType,
				amount,
				category: categorySelected.value,
				account: accountSelected.value,
				comment,
			},
		).then(({ error, data }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			setIsServerPass(true);
			dispatch(updateAccounts);
			if (!transactionId) {
				reset();
			}
		});
	};

	const onToggleActive = (index) => {
		reset({ ['categorySelected']: null });
		setIndexActive(index);
	};

	const onDeleteTransaction = (id) => {
		dispatch(
			openModal({
				text: 'Удалить операцию?',
				onConfirm: () => {
					request(`/transactions/${id}`, 'DELETE').then(() => {
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
		(errors?.amount?.message && 'Введите сумму') ||
		errors?.categorySelected?.message ||
		errors?.accountSelected?.message ||
		errors?.comment?.message;

	const errorMessage = formError || serverError;

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
					onChange: () => {
						setServerError(null);
						setIsServerPass(null);
					},
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
				onChange={(date) => setStartDate(date)}
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
			{transactionId && (
				<button
					className="delete-button"
					type="button"
					onClick={() => onDeleteTransaction(transactionId)}
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
