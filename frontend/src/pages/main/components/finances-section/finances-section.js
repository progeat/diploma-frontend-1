import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardInfo } from './components';
import { selectAccounts } from '../../../../selectors';
import { request } from '../../../../utils';
import styled from 'styled-components';

const FinancesSectionContainer = ({ className }) => {
	const [statistics, setStatistics] = useState({
		expenses: [],
		income: [],
	});
	const [errorMessage, setErrorMessage] = useState(null);
	const accounts = useSelector(selectAccounts);

	useEffect(() => {
		request('/statistics?period=1').then((statisticsRes) => {
			if (statisticsRes.error) {
				setErrorMessage(statisticsRes.error);
				return;
			}

			setStatistics((prev) => ({
				...prev,
				...statisticsRes.data,
			}));
		});
	}, []);

	if (errorMessage) {
		return <div className="error-message">{errorMessage}</div>;
	}
	// TODO продумать карточку счетов
	return (
		<div className={className}>
			<CardInfo title="Доходы" path="/transaction" value={statistics.income} />
			<CardInfo title="Счета" path="/accounts" value={accounts} />
			<CardInfo title="Расходы" path="/transaction" value={statistics.expenses} />
		</div>
	);
};

export const FinancesSection = styled(FinancesSectionContainer)`
	display: flex;
	justify-content: space-between;
	min-height: 500px;

	& > div:not(:last-child) {
		margin-right: 15px;
	}

	& .error-message {
		color: red;
	}
`;
