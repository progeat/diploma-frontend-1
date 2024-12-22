import { AnalyticsSection, FinancesSection } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	return (
		<div className={className}>
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
