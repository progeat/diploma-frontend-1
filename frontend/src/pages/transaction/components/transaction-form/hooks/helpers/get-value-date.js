export const getValueDate = (transaction) =>
	transaction?.transactionAt ? new Date(transaction?.transactionAt) : new Date();
