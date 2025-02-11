import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ControlPanelAnalytics, ExpensesChart, IncomeChart } from './components';
import { selectStatistics } from '../../../../store/selectors';
import styled from 'styled-components';
import { TabSwitcher } from '../../../../components/common';

const AnaliticsSectionContainer = ({ className }) => {
	const [indexActive, setIndexActive] = useState(0);
	const [isActiveExpenses, setIsActiveExpenses] = useState(true);
	const statistics = useSelector(selectStatistics);

	const onToggleActive = () => {};

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
	position: relative;

	& .analytics {
		margin: 0 auto;
		width: 400px;
	}
`;
