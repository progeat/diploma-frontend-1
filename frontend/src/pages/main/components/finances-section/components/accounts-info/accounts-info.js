import styled from 'styled-components';

const AccountsInfoContainer = ({ className, accounts }) => {
	return (
		<div className={className}>
			<h3 className="top-panel">Счета</h3>
			<ul className="list-accounts">
				{accounts.map(({ id, name, balance }) => (
					<li className="item" key={id}>
						<div>{name}</div>
						<div>{balance}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export const AccountsInfo = styled(AccountsInfoContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 2px solid #000;
	padding: 10px;

	& .item {
		display: flex;
		justify-content: space-between;
		border: 1px solid #000;
		padding: 5px;
	}

	& .item:not(:last-child) {
		margin-bottom: 5px;
	}
`;
