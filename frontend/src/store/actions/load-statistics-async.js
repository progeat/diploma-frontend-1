import { request } from '../../utils';
import { setAppError } from './set-app-error';
import { setStatistics } from './set-statistics';
import { setStatisticsError } from './set-statistics-error';
import { setStatisticsIndexSelectLoaded } from './set-statistics-index-select-loaded';
import { setStatisticsIsLoading } from './set-statistics-is-loading';

export const loadStatisticsAsync = (indexSelect) => (dispatch) => {
	dispatch(setStatisticsIsLoading(true));
	request(`/statistics?period=${indexSelect}`)
		.then(({ data, error }) => {
			if (error) {
				dispatch(setStatisticsError(error));
				return;
			}

			dispatch(setStatistics(data));
			dispatch(setStatisticsIndexSelectLoaded(indexSelect));
		})
		.catch((error) => {
			dispatch(setAppError(error));
		})
		.finally(() => {
			dispatch(setStatisticsIsLoading(false));
		});
};
