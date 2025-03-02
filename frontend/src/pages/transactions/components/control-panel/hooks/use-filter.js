import { useState } from 'react';
import { useAccounts, useCategories } from '../../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { createSelectorOptions } from '../helpers';
import {
	RESET_FILTER_ACCOUNT,
	RESET_FILTER_CATEGORY,
	RESET_FILTER_DATE,
	RESET_FILTERS,
	setFilterAccount,
	setFilterCategory,
	setFilterDate,
} from '../../../../../store/actions';
import { selectFilter } from '../../../../../store/selectors';
import { findOptionSelect, getIsValueFilter } from './helpers';

export const useFilter = () => {
	const { accounts } = useAccounts();
	const { categories } = useCategories();
	const { account, category, dateRange, searchPhrase } = useSelector(selectFilter);
	const { start, end } = dateRange;
	const [datePicker, setDatePicker] = useState([start, end]);
	const [startPicker, endPicker] = datePicker;
	const dispatch = useDispatch();

	const isValueFilter = getIsValueFilter([account, category, start, end, searchPhrase]);

	const accountsOptions = createSelectorOptions(accounts);
	const categoriesOptions = createSelectorOptions(categories);

	const accountOptionSelected = findOptionSelect(account, accountsOptions);
	const categoryOptionSelected = findOptionSelect(category, categoriesOptions);

	const onSetFilterDate = ([start, end]) => {
		setDatePicker([start, end]);

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

	const onResetFilters = () => {
		dispatch(RESET_FILTERS);
		setDatePicker([null, null]);
	};

	return {
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
	};
};
