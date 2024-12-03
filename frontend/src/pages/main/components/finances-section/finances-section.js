import { useEffect, useState } from 'react';
import { AccountsInfo, ExpensesInfo, IncomeInfo } from './components';
import { request } from '../../../../utils';
import styled from 'styled-components';

const FinancesSectionContainer = ({ className }) => {
	const [transactions, setTransactions] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		Promise.all([request('/transactions'), request('/accounts')]).then(
			([transactionsRes, accountsRes]) => {
				if (transactionsRes.error || accountsRes.error) {
					setErrorMessage(transactionsRes.error || accountsRes.error);
					return;
				}

				setTransactions(transactionsRes.data.transactions);
				setAccounts(accountsRes.data);
			},
		);
	}, []);

	console.log('операции', transactions);
	console.log('счета', accounts);

	return (
		<div className={className}>
			<IncomeInfo transactions={transactions} />
			<AccountsInfo accounts={accounts} />
			<ExpensesInfo transactions={transactions} />
			<div className="error-message">{errorMessage}</div>
		</div>
	);
};

export const FinancesSection = styled(FinancesSectionContainer)`
	display: flex;
	justify-content: space-between;
	min-height: 500px;

	& .error-message {
		color: red;
	}
`;
