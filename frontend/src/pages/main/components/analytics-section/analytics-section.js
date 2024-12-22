import { useEffect, useState } from 'react';
import { ControlPanelAnalytics, ExpensesChart, IncomeChart } from './components';
import { request } from '../../../../utils';
import styled from 'styled-components';
import { Button, Loader } from '../../../../components';

const AnaliticsSectionContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [statistics, setStatistics] = useState({
		expenses: [],
		income: [],
	});
	const [errorMessage, setErrorMessage] = useState(null);
	const [isActiveExpenses, setIsActiveExpenses] = useState(true);

	useEffect(() => {
		request('/statistics?period=1')
			.then((statisticsRes) => {
				if (statisticsRes.error) {
					setErrorMessage(statisticsRes.error);
					return;
				}

				setStatistics((prev) => ({
					...prev,
					...statisticsRes.data,
				}));
			})
			.then(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<ControlPanelAnalytics
				isActiveExpenses={isActiveExpenses}
				setIsActiveExpenses={setIsActiveExpenses}
			/>
			<div className="analytics">
				{isActiveExpenses ? (
					<ExpensesChart expenses={statistics.expenses} />
				) : (
					<IncomeChart income={statistics.income} />
				)}
			</div>
		</div>
	);
};

export const AnalyticsSection = styled(AnaliticsSectionContainer)`
	& .analytics {
		margin: 0 auto;
		width: 400px;
	}
`;
