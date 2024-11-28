import { Icon } from '../../../../../../components';
import styled from 'styled-components';

const TransactionItemContainer = ({
	className,
	amount,
	id,
	accountId,
	categoryId,
	comment,
	createdAt,
}) => {
	return (
		<div className={className}>
			<div className="item-column">
				<div className="item-icon">
					<Icon id="fa-cutlery" margin="0" size="20px" />
				</div>
				<div className="item-info">
					<div>Категория</div>
					<div>Счёт</div>
				</div>
			</div>
			<div className="item-comment">{comment}</div>
			<div className="item-column">
				<div className="item-amount">{amount} ₽</div>
				<div className="item-control">
					<Icon id="fa-pencil" margin="0 7px 0 0" size="18px" />
					<Icon id="fa-trash-o" margin="0 7px 0 0" size="18px" />
				</div>
			</div>
		</div>
	);
};

export const TransactionItem = styled(TransactionItemContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid #000;
	padding: 10px 20px;

	& .item-column {
		display: flex;
	}

	& .item-column > div:not(:last-child) {
		margin-right: 10px;
	}

	& .item-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50px;
		width: 40px;
		height: 40px;
		color: #fff;
		background-color: #64cfa8;
	}

	& .item-control {
		display: flex;
	}
`;
