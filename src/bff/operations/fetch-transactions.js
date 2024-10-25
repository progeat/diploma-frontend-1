import { getTransactions } from '../api';

export const fetchTransactions = async () => {
	const transactions = await getTransactions();

	console.log('fetchTransactions transactions', transactions);

	return {
		error: null,
		res: {
			transactions,
		},
	};
};
