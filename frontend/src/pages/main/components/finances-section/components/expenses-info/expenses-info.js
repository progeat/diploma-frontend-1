import styled from 'styled-components';

const ExpensesInfoContainer = ({ className, transactions }) => {
	return (
		<div className={className}>
			<h3 className="top-panel">Расходы</h3>
			<ul className="list-expenses">
				{transactions.map(({ id, amount, comment }) => (
					<li className="item" key={id}>
						<div>{comment}</div>
						<div>{amount}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export const ExpensesInfo = styled(ExpensesInfoContainer)`
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
