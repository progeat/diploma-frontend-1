import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardInfo } from './components';
import { selectAccounts } from '../../../../selectors';
import { request } from '../../../../utils';
import styled from 'styled-components';

const FinancesSectionContainer = ({ className }) => {
	const [transactions, setTransactions] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const accounts = useSelector(selectAccounts);

	useEffect(() => {
		request('/transactions').then((transactionsRes) => {
			if (transactionsRes.error) {
				setErrorMessage(transactionsRes.error);
				return;
			}

			setTransactions(transactionsRes.data.transactions);
		});
	}, []);

	return (
		<div className={className}>
			<CardInfo title="Доходы" path="/transaction" value={transactions} />
			<CardInfo title="Счета" path="/accounts" value={accounts} />
			<CardInfo title="Расходы" path="/transaction" value={transactions} />
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
