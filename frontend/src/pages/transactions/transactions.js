import { ControlPanel, TransactionsList } from './components';
import styled from 'styled-components';

const TransactionsContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="header">
				<h2>История операций</h2>
				<ControlPanel />
			</div>
			<TransactionsList />
		</div>
	);
};

export const Transactions = styled(TransactionsContainer)`
	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
