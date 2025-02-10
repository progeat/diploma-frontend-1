import { useSelector } from 'react-redux';
import { CardInfo } from './components';
import { selectAccounts, selectStatistics } from '../../../../store/selectors';
import { getTotalPrice } from './utils';
import { TYPE_ACCOUNT } from '../../../../constants';
import styled from 'styled-components';

const FinancesSectionContainer = ({ className }) => {
	const accounts = useSelector(selectAccounts);
	const statistics = useSelector(selectStatistics);
	const totalSavings = accounts.reduce((acc, account) => {
		if (account.type !== TYPE_ACCOUNT.CREDIT) {
			acc += account.balance;

			return acc;
		}

		return acc;
	}, 0);

	return (
		<div className={className}>
			<div className="header-info">
				<div className="total-info">
					Всего накоплений:
					<span className="total-price">{totalSavings} ₽</span>
				</div>
				<div className="total-info">
					Расход:
					<span className="total-price">
						{getTotalPrice(statistics?.expenses) || 0} ₽
					</span>
				</div>
				<div className="total-info">
					Доход:
					<span className="total-price">
						{getTotalPrice(statistics?.income) || 0} ₽
					</span>
				</div>
			</div>
			<div className="cards-wrapper">
				<CardInfo title="Доходы" path="/transaction" value={statistics.income} />
				<CardInfo title="Счета" path="/account" value={accounts} />
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
		display: flex;
		column-gap: 5%;
		margin-bottom: 20px;
		color: #777;
	}

	& .total-price {
		margin-left: 5px;
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
