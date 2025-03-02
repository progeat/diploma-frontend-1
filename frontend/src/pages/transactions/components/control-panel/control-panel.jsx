import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { Icon } from '../../../../components/common';
import { useFilter } from './hooks';
import styled from 'styled-components';

const ControlPanelContainer = ({ className }) => {
	const {
		accountsOptions,
		accountOptionSelected,
		onSetFilterAccount,
		categoriesOptions,
		categoryOptionSelected,
		onSetFilterCategory,
		startPicker,
		endPicker,
		onSetFilterDate,
		isValueFilter,
		onResetFilters,
	} = useFilter();

	return (
		<div className={className}>
			<div className="top">
				<h4>Фильтры :</h4>
				{isValueFilter && (
					<Icon
						className="icon-filter"
						id="fa fa-times-circle"
						size="30px"
						onClick={onResetFilters}
					/>
				)}
			</div>
			<Select
				value={accountOptionSelected}
				className="select"
				classNamePrefix="select"
				options={accountsOptions}
				placeholder="по счёту"
				onChange={onSetFilterAccount}
				isClearable
			/>
			<Select
				value={categoryOptionSelected}
				className="select"
				classNamePrefix="select"
				options={categoriesOptions}
				placeholder="по категории"
				onChange={onSetFilterCategory}
				isClearable
			/>
			{startPicker && endPicker && (
				<div className="icon-wrapper">
					<Icon
						className="icon"
						id="fa-times"
						size="20px"
						onClick={() => onSetFilterDate(['', ''])}
					/>
				</div>
			)}
			<DatePicker
				selected={startPicker}
				onChange={onSetFilterDate}
				startDate={startPicker}
				endDate={endPicker}
				selectsRange
				inline
			/>
			<div className="link-wrapper">
				<Link className="link" to="/transaction">
					Добавить операцию
				</Link>
			</div>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	height: 100%;
	border-radius: 24px;
	padding: 10px 10px 20px;
	background-color: #2b2d32;

	& .top {
		position: relative;
		display: flex;
	}

	& h4 {
		margin: 10px;
	}

	& .icon-filter {
		position: absolute;
		z-index: 1;
		top: -2px;
		left: 50%;
		transform: translateX(-50%);
	}

	& .icon-wrapper {
		position: relative;
		width: 100%;
	}

	& .icon {
		position: absolute;
		z-index: 1;
		top: 28px;
		left: 50%;
		transform: translateX(-50%);
	}

	& .react-datepicker {
		border: 0;
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

	& .select {
		margin-bottom: 10px;
	}

	& .select__control {
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

	& .link-wrapper {
		margin-top: auto;
		display: flex;
		justify-content: center;
	}

	& .link {
		display: inline-block;
		text-align: center;
		margin: 0 auto;
		width: 100%;
		max-width: 200px;
		border: 1px solid #f8f8f9;
		border-radius: 8px;
		padding: 5px 5px 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .link:hover {
		color: #000;
		background-color: #f8f8f9;
	}
`;
