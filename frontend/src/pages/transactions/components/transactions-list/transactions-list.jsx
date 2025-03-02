import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components/common';
import { Loader } from '../../../../components/ui';
import { TransactionItem } from './components';
import { useTransactions } from '../../../../hooks';
import styled from 'styled-components';

const TransactionsListContainer = ({ className, paginationRef }) => {
	const transactionListRef = useRef();
	const { transactions, transactionsOnPage, setFlag, isLoading } = useTransactions(
		transactionListRef,
		paginationRef,
	);
	const navigate = useNavigate();

	return (
		<div className={className}>
			<ul
				ref={transactionListRef}
				className={[
					`list ${transactions.length === transactionsOnPage ? 'list-filled' : ''}`,
				]}
			>
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
								setFlag={setFlag}
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
			</ul>
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
		justify-content: start;
		min-height: 100%;
		height: 100%;
	}

	& .list > li:not(:last-child) {
		margin-bottom: 10px;
	}

	& .list-filled {
		justify-content: space-evenly;
	}
`;
