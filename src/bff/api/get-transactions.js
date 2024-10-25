import { transformTransaction } from '../transformers';

export const getTransactions = () =>
	fetch('http://localhost:3005/transactions')
		.then((loadedTransactions) => loadedTransactions.json())
		.then((loadedTransactions) => loadedTransactions.map(transformTransaction));
