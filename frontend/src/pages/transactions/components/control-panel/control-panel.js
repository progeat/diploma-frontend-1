import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
	RESET_FILTER_ACCOUNT,
	RESET_FILTER_CATEGORY,
	RESET_FILTER_DATE,
	setFilterAccount,
	setFilterCategory,
	setFilterDate,
} from '../../../../actions';
import { selectAccounts, selectCategories } from '../../../../selectors';
import styled from 'styled-components';

const customStyles = {
	day: {
		width: '2rem',
		height: '2rem',
		padding: '0.25rem',
		margin: '0.125rem',
		borderRadius: '50%',
		textAlign: 'center',
	},
	dayActive: {
		backgroundColor: '#00a8ff',
		color: 'white',
	},
};

const createSelectorOptions = (arrayValues) =>
	arrayValues.map((obj) => ({ value: obj.id, label: obj.name }));

const ControlPanelContainer = ({ className }) => {
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	const accountsOptions = createSelectorOptions(accounts);
	const categoriesOptions = createSelectorOptions(categories);

	const dispatch = useDispatch();

	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	const onSetFilterDate = ([start, end]) => {
		setDateRange([start, end]);

		if (start && end) {
			dispatch(
				setFilterDate({
					start: Date.parse(start),
					end: new Date(end).setDate(end.getDate() + 1),
				}),
			);
		} else if (!start && !end) {
			dispatch(RESET_FILTER_DATE);
		}
	};

	const onSetFilterAccount = (select) => {
		if (select !== null) {
			dispatch(setFilterAccount(select.value));
		} else {
			dispatch(RESET_FILTER_ACCOUNT);
		}
	};

	const onSetFilterCategory = (select) => {
		if (select !== null) {
			dispatch(setFilterCategory(select.value));
		} else {
			dispatch(RESET_FILTER_CATEGORY);
		}
	};

	return (
		<div className={className}>
			<h4>Фильтры :</h4>
			<DatePicker
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				onChange={onSetFilterDate}
				placeholderText="по дате"
				isClearable={true}
			/>
			<Select
				className="select"
				options={accountsOptions}
				placeholder="по счёту"
				onChange={onSetFilterAccount}
				isClearable
			/>
			<Select
				className="select"
				options={categoriesOptions}
				placeholder="по категории"
				onChange={onSetFilterCategory}
				isClearable
			/>
			<Link to="/transaction">Добавить операцию</Link>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 10px;

	& h4 {
		margin: 10px;
	}

	& .select:not(:last-child) {
		margin-right: 10px;
	}

	& > .select:last-child {
		margin-right: auto;
	}

	& > a {
		margin-left: auto;
		border: 1px solid #000;
		padding: 5px;
	}
`;
