import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardInfo } from './components';
import { selectAccounts } from '../../../../selectors';
import { request } from '../../../../utils';
import styled from 'styled-components';
import { TYPE_ACCOUNT } from '../../../../constants';

const FinancesSectionContainer = ({ className }) => {
	const [statistics, setStatistics] = useState({
		expenses: [],
		income: [],
	});
	const [errorMessage, setErrorMessage] = useState(null);
	const accounts = useSelector(selectAccounts);
	const totalSavings = accounts.reduce((acc, account) => {
		if (account.type !== TYPE_ACCOUNT.CREDIT) {
			acc += account.balance;

			return acc;
		}

		return acc;
	}, 0);

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

	return (
		<div className={className}>
			<div className="header-info">
				Всего накоплений:
				<span className="total-savings"> {totalSavings} ₽</span>
			</div>
			<div className="cards-wrapper">
				<CardInfo title="Доходы" path="/transaction" value={statistics.income} />
				<CardInfo title="Счета" path="/accounts" value={accounts} />
				<CardInfo
					title="Расходы"
					path="/transaction"
					value={statistics.expenses}
				/>
			</div>
		</div>
	);
};

export const FinancesSection = styled(FinancesSectionContainer)`
	padding: 20px;

	& .header-info {
		margin-bottom: 20px;
		color: #777;
	}

	& .total-savings {
		font-weight: 600;
		color: #f8f8f9;
	}

	& .cards-wrapper {
		display: flex;
		justify-content: space-between;
		min-height: 500px;
	}

	& .cards-wrapper > div:not(:last-child) {
		margin-right: 15px;
	}

	& .error-message {
		color: red;
	}
`;
