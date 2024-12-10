import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../components';
import styled from 'styled-components';
import { CLOSE_MODAL, openModal } from '../../../../../../actions';
import { request } from '../../../../../../utils';

const TransactionItemContainer = ({
	className,
	amount,
	id,
	account,
	category,
	comment,
	createdAt,
	setTriggerFlag,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onTransactionRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить операцию?',
				onConfirm: () => {
					request(`/transactions/${id}`, 'DELETE').then(() => {
						setTriggerFlag((prev) => !prev);
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="item-column">
				<div className="item-icon">
					<Icon id="fa-cutlery" margin="0" size="20px" />
				</div>
				<div className="item-info">
					<div>{category.name}</div>
					<div>{account.name}</div>
				</div>
			</div>
			<div className="item-comment">{comment}</div>
			<div className="item-column">
				<div className="item-amount">
					{!category.type && '-'} {amount} ₽
				</div>
				<div className="item-control">
					<Icon
						id="fa-pencil"
						margin="0 7px 0 0"
						size="18px"
						onClick={() => navigate(`/transaction/${id}/edit`)}
					/>
					<Icon
						id="fa-trash-o"
						margin="0 7px 0 0"
						size="18px"
						onClick={() => onTransactionRemove(id)}
					/>
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
