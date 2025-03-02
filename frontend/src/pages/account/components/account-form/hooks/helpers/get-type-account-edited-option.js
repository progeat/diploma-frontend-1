import { ACCOUNT_TYPE_OPTIONS } from '../../constants';

export const getTypeAccountEditedOption = (account) =>
	ACCOUNT_TYPE_OPTIONS.find((option) => option.value === account?.type);
