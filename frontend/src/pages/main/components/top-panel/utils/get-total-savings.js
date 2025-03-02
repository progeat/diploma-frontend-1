import { TYPE_ACCOUNT } from '../../../../../constants';

export const getTotalSavings = (accounts = []) => {
	if (!accounts) {
		return 0;
	}

	return accounts.reduce((acc, account) => {
		if (account.type !== TYPE_ACCOUNT.CREDIT) {
			acc += account.balance;

			return acc;
		}

		return acc;
	}, 0);
};
