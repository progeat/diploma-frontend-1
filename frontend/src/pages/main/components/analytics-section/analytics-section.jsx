import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TabSwitcher } from '../../../../components/common';
import { ExpensesChart, IncomeChart } from './components';
import { selectStatistics } from '../../../../store/selectors';
import styled from 'styled-components';

const AnaliticsSectionContainer = ({ className }) => {
	const [indexActive, setIndexActive] = useState(0);
	const statistics = useSelector(selectStatistics);

	const onToggleActive = (index) => {
		setIndexActive(index);
	};

	return (
		<div className={className}>
			<TabSwitcher
				names={['Расходы', 'Доходы']}
				indexActive={indexActive}
				onToggleActive={onToggleActive}
			/>
			<div className="analytics">
				{indexActive === 0 ? (
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
	padding: 0 20px 20px;

	& .analytics {
		margin: 0 auto;
		width: 400px;
	}
`;
