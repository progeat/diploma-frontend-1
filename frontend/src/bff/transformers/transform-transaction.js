export const transformTransaction = (dbTransaction) => ({
	id: dbTransaction.id,
	accountId: dbTransaction.account_id,
	categoryId: dbTransaction.category_id,
	amount: dbTransaction.amount,
	comment: dbTransaction.comment,
	createdAt: dbTransaction.created_at,
});
