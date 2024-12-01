import { TransactionItem } from './components';
import styled from 'styled-components';

const TransactionsListContainer = ({ className, transactions }) => {
	// const [transactions, setTransactions] = useState([]);
	// const requestServer = useServerRequest();

	// useEffect(() => {
	// 	requestServer('fetchTransactions').then(({ res }) =>
	// 		setTransactions(res.transactions),
	// 	);
	// }, [requestServer]);

	return (
		<>
			{transactions.length > 0 ? (
				<div className={className}>
					{transactions.map(
						({ id, accountId, categoryId, amount, comment, createdAt }) => (
							<TransactionItem
								key={id}
								id={id}
								accountId={accountId}
								categoryId={categoryId}
								amount={amount}
								comment={comment}
								createdAt={createdAt}
							/>
						),
					)}
				</div>
			) : (
				<div className="no-transactions-found">Операции не найдены</div>
			)}
		</>
	);
};

export const TransactionsList = styled(TransactionsListContainer)`
	& > div:not(:last-child) {
		margin-bottom: 10px;
	}
`;
