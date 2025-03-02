import { CardInfo } from './components';
import styled from 'styled-components';

const FinancesSectionContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="cards-wrapper">
				<CardInfo title="Доходы" path="/transaction" type="income" />
				<CardInfo title="Счета" path="/account" type="accounts" />
				<CardInfo title="Расходы" path="/transaction" type="expenses" />
			</div>
		</div>
	);
};

export const FinancesSection = styled(FinancesSectionContainer)`
	padding: 20px;

	& .cards-wrapper {
		display: flex;
		justify-content: space-between;
		min-height: 360px;
	}

	& .cards-wrapper > div {
		flex: 1 calc(33.33% - 30px);
	}

	& .cards-wrapper > div:not(:last-child) {
		margin-right: 15px;
	}

	& .error-message {
		color: red;
	}
`;
