import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { selectAccounts, selectCategories } from '../../../../selectors';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

const filtersOptions = [
	{ value: 0, label: 'дате' },
	{ value: 1, label: 'счетам' },
	{ value: 2, label: 'категориям' },
];

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

const ControlPanelContainer = ({ className, setFilter }) => {
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	const accountsOptions = createSelectorOptions(accounts);
	const categoriesOptions = createSelectorOptions(categories);

	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	return (
		<div className={className}>
			<h4>Фильтры :</h4>
			<DatePicker
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				onChange={(update) => {
					setDateRange(update);
				}}
				placeholderText="по дате"
				isClearable={true}
			/>
			<Select
				className="select"
				options={accountsOptions}
				placeholder="по счёту"
				onChange={({ value }) => setFilter(value)}
			/>
			<Select
				className="select"
				options={categoriesOptions}
				placeholder="по категории"
				onChange={({ value }) => setFilter(value)}
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
