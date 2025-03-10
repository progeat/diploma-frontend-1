import { AnalyticsSection, FinancesSection, TopPanel } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	return (
		<div className={className}>
			<TopPanel />
			<FinancesSection />
			<AnalyticsSection />
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
`;
