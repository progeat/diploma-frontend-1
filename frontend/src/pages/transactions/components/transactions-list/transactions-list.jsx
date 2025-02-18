import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components/common';
import { Loader } from '../../../../components/ui';
import { TransactionItem } from './components';
import styled from 'styled-components';

const TransactionsListContainer = ({
	className,
	transactions,
	transactionsOnPage,
	isLoading = true,
	setTriggerFlag,
	transactionListRef,
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div ref={transactionListRef} className="list">
				{isLoading ? (
					<Loader />
				) : transactions.length > 0 ? (
					transactions.map(
						({ id, account, category, amount, comment, transactionAt }) => (
							<TransactionItem
								key={id}
								id={id}
								account={account}
								category={category}
								amount={amount}
								comment={comment}
								transactionAt={transactionAt}
								setTriggerFlag={setTriggerFlag}
							/>
						),
					)
				) : (
					<>
						<div>Список операций пуст</div>
						<Icon
							style={{ textAlign: 'center' }}
							id="fa-plus-circle"
							margin="0"
							size="80px"
							onClick={() => navigate('/transaction')}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export const TransactionsList = styled(TransactionsListContainer)`
	position: relative;
	width: 100%;
	min-height: 370px;
	height: 100%;
	border-radius: 12px;
	padding: 12px;
	background-color: #2b2d32;

	& .list {
		display: flex;
		flex-direction: column;
		justify-content: ${({ transactions, transactionsOnPage }) =>
			transactions.length === transactionsOnPage ? 'space-evenly' : 'start'};
		min-height: 100%;
		height: 100%;
	}

	& .list > div:not(:last-child) {
		margin-bottom: ${({ transactions, transactionsOnPage }) =>
			transactions.length === transactionsOnPage ? '0' : '10px'};
	}
`;
