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

	console.log('Операции с бека', transactions);

	return (
		<>
			{transactions.length > 0 ? (
				<div className={className}>
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
