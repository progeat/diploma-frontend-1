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

// const customSelectStyles = {
// 	control: (provided, state) => ({
// 		...provided,
// 		color: '#fff',
// 		backgroundColor: '#4d525f',
// 		borderColor: state.isFocused ? '#85bb65' : '#e0e6ed',
// 		boxShadow: state.isFocused ? '0 0 0 1px #85bb65' : null,
// 		'&:hover': {
// 			borderColor: state.isFocused ? '#85bb65' : '#a1a8b3',
// 		},
// 	}),
// 	option: (provided, state) => ({
// 		...provided,
// 		color: state.isSelected ? '#fff' : '#fff',
// 		backgroundColor: state.isSelected ? '#959cad' : '#4d525f',
// 		cursor: 'pointer',
// 		':active': {
// 			backgroundColor: state.isSelected ? '#5c9210' : '#dce0e5',
// 		},
// 	}),
// };

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
				className="date-picker"
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
				// styles={customSelectStyles}
				isClearable
			/>
			<Select
				className="select"
				options={categoriesOptions}
				placeholder="по категории"
				onChange={onSetFilterCategory}
				isClearable
			/>
			<Link to="/transaction" style={{ border: 0 }}>
				Добавить операцию
			</Link>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	// align-items: center;
	border-radius: 24px;
	padding: 1px 1px 1px 10px;
	background-color: #2b2d32;

	& h4 {
		margin: 10px;
	}

	& .date-picker {
		margin-right: 10px;
		min-height: 38px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding-left: 8px;
		font-size: 16px;
	}

	& .react-datepicker__close-icon {
		padding-right: 15px;
	}

	& .react-datepicker__close-icon::after {
		font-size: 24px;
		color: #ccc;
		background-color: transparent;
	}

	// & .select .select {
	// 	background-color: #4d525f;
	// }

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
