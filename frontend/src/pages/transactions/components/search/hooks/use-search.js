import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchPhrase } from '../../../../../store/actions';
import { debounce } from '../../../../../utils';
import { selectFilter } from '../../../../../store/selectors';

export const useSearch = () => {
	const { searchPhrase } = useSelector(selectFilter);
	const [inputSearchPhrase, setInputSearchPhrase] = useState(searchPhrase);
	const dispatch = useDispatch();

	const startDelayedSearch = useMemo(() => debounce(dispatch, 2000), []);

	// при сбросе фильтров сбрасываем значение инпута
	useEffect(() => {
		if (searchPhrase === '') {
			setInputSearchPhrase(searchPhrase);
		}
	}, [searchPhrase]);

	const onSearch = ({ target }) => {
		startDelayedSearch(setSearchPhrase(target.value));
		setInputSearchPhrase(target.value);
	};

	return {
		inputSearchPhrase,
		onSearch,
	};
};
