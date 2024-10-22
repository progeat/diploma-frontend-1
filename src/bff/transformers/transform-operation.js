export const transformOperation = (dbOperation) => ({
	id: dbOperation.id,
	accountId: dbOperation.account_id,
	categoryId: dbOperation.category_id,
	amount: dbOperation.amount,
	comment: dbOperation.comment,
	createdAt: dbOperation.created_at,
});
