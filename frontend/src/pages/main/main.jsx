import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TabSwitcher } from '../../components/common';
import { AnalyticsSection, FinancesSection } from './components';
import { setIsLoadingStatistics, setStatistics } from '../../store/actions';
import { request } from '../../utils';
import { getNamesOfPastMonths } from './components/utils';
import styled from 'styled-components';

const TopPanelStyled = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 20px;
`;

const MainContainer = ({ className }) => {
	const [indexActive, setIndexActive] = useState(0);
	const [errorMessage, setErrorMessage] = useState(null);
	const namesTabSwitcher = getNamesOfPastMonths(3);
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
			<TopPanelStyled>
				<span className="title-switcher">Период за:</span>
				<TabSwitcher
					names={namesTabSwitcher}
					indexActive={indexActive}
					onToggleActive={onToggleActive}
				/>
			</TopPanelStyled>
			<FinancesSection />
			<AnalyticsSection />
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	padding: 0 20px;

	& .title-switcher {
		margin-right: 10px;
		color: #777;
	}

	& .error-message {
		color: red;
	}
`;
