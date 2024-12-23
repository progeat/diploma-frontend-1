import { Loader } from '../../../../components';
import { TransactionItem } from './components';
import styled from 'styled-components';

const TransactionsListContainer = ({
	className,
	transactions,
	isLoading,
	setTriggerFlag,
}) => {
	if (isLoading) {
		return <Loader />;
	}

	// TODO сделать фон списка статичным при загрузке данных
	return (
		<div className={className}>
			{transactions.length > 0 ? (
				<div className="list">
					{transactions.map(
						({ id, account, category, amount, comment, createdAt }) => (
							<TransactionItem
								key={id}
								id={id}
								account={account}
								category={category}
								amount={amount}
								comment={comment}
								createdAt={createdAt}
								setTriggerFlag={setTriggerFlag}
							/>
						),
					)}
				</div>
			) : (
				<div className="no-transactions-found">Операции не найдены</div>
			)}
		</div>
	);
};

export const TransactionsList = styled(TransactionsListContainer)`
	max-width: 800px;
	width: 100%;
	min-height: 370px;
	border-radius: 12px;
	padding: 12px;
	background-color: #2b2d32;

	& .list > div:not(:last-child) {
		margin-bottom: 10px;
	}
`;
