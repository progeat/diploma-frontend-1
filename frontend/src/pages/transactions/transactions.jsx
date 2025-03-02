import { useRef } from 'react';
import { ControlPanel, Pagination, Search, TransactionsList } from './components';
import styled from 'styled-components';

const TransactionsContainer = ({ className }) => {
	const paginationRef = useRef();

	return (
		<div className={className}>
			<div className="column-left">
				<h2>История операций</h2>
				<ControlPanel />
			</div>
			<div className="column-right">
				<div className="transactions-wrapper">
					<Search />
					<TransactionsList paginationRef={paginationRef} />
					<Pagination ref={paginationRef} />
				</div>
			</div>
		</div>
	);
};

export const Transactions = styled(TransactionsContainer)`
	display: flex;
	height: 100%;
	padding: 30px;

	& .column-left,
	.column-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	& .column-left h2 {
		margin-bottom: 30px;
	}

	& .column-right {
		justify-content: space-between;
		width: 100%;
	}

	& .transactions-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 1200px;
		width: 100%;
		height: 100%;
		padding-left: 20px;
	}

	& .transactions-wrapper > div:not(:last-child) {
		margin-bottom: 20px;
	}
`;
