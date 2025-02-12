import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnalyticsSection, FinancesSection, TopPanel } from './components';
import { setIsLoadingStatistics, setStatistics } from '../../store/actions';
import { request } from '../../utils';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [indexActive, setIndexActive] = useState(0);
	const [errorMessage, setErrorMessage] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIsLoadingStatistics(true));
		request(`/statistics?period=${indexActive}`)
			.then((statisticsRes) => {
				if (statisticsRes.error) {
					setErrorMessage(statisticsRes.error);
					return;
				}

				dispatch(setStatistics(statisticsRes.data));
			})
			.finally(() => {
				dispatch(setIsLoadingStatistics(false));
			});
	}, [dispatch, indexActive]);

	const onToggleActive = (index) => {
		setIndexActive(index);
	};

	return (
		<div className={className}>
			{errorMessage && (
				<div className="error-message">
					Ошибка при загрузки данных: {errorMessage}
				</div>
			)}
			<TopPanel indexActive={indexActive} onToggleActive={onToggleActive} />
			<FinancesSection />
			<AnalyticsSection />
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	padding: 0 20px;

	& .error-message {
		color: red;
	}
`;
