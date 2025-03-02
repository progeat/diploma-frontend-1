import { TYPE_CATEGORY } from '../../../../../../constants';

export const getIndexActive = (transaction) =>
	transaction?.type === TYPE_CATEGORY.INCOME ? 1 : 0;
