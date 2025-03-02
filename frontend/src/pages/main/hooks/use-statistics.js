import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStatisticsAsync, setStatisticsIndexSelect } from '../../../store/actions';
import { selectStatistics } from '../../../store/selectors';

export const useStatistics = () => {
	const { statistics, indexSelect, indexSelectLoaded, isLoading, error } =
		useSelector(selectStatistics);
	const dispatch = useDispatch();

	const loadStatistics = useCallback(
		(indexSelect) => {
			dispatch(loadStatisticsAsync(indexSelect));
		},
		[dispatch],
	);

	useEffect(() => {
		if (!statistics.income || !statistics.expenses) {
			loadStatistics(indexSelect);

			return;
		} else if (indexSelect !== indexSelectLoaded) {
			loadStatistics(indexSelect);
		}
	}, [loadStatistics, statistics, indexSelect, indexSelectLoaded]);

	const onToggleSelect = (index) => {
		dispatch(setStatisticsIndexSelect(index));
	};

	return { statistics, indexSelect, onToggleSelect, isLoading, error };
};
