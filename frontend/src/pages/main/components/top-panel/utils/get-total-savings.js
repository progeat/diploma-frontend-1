import { TYPE_ACCOUNT } from '../../../../../constants';

export const getTotalSavings = (accounts) =>
	accounts.reduce((acc, account) => {
		if (account.type !== TYPE_ACCOUNT.CREDIT) {
			acc += account.balance;

			return acc;
		}

		return acc;
	}, 0);
