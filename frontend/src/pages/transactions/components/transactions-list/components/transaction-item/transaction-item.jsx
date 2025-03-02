import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../components/common';
import {
	CLOSE_MODAL,
	loadAccountsAsync,
	openModal,
	RESET_STATISTICS,
} from '../../../../../../store/actions';
import { formatDate, request } from '../../../../../../utils';
import { TYPE_CATEGORY } from '../../../../../../constants';
import styled from 'styled-components';

const TransactionItemContainer = ({
	className,
	amount,
	id,
	account,
	category,
	comment,
	transactionAt,
	setFlag,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const date = formatDate(transactionAt);

	const onTransactionRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить операцию?',
				onConfirm: () => {
					request(`/transactions/${id}`, 'DELETE').then(() => {
						dispatch(loadAccountsAsync);
						dispatch(RESET_STATISTICS);
						setFlag();
					});

					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<li className={className}>
			<div className="item-column-left">
				<div className="item-icon">
					<Icon
						className="icon"
						id={category.icon}
						margin="0"
						size="20px"
						color="#f8f8f9"
					/>
				</div>
				<div className="item-info">
					<div className="item-date">{date}</div>
					<div>{category.name}</div>
					<div>{account.name}</div>
				</div>
			</div>
			<div className="item-comment">{comment}</div>
			<div className="item-column-right">
				<div className="item-amount">
					{category.type === TYPE_CATEGORY.EXPENSE && '-'} {amount} ₽
				</div>
				<div className="item-control">
					<Icon
						id="fa-pencil"
						margin="0 10px 0 0"
						size="18px"
						onClick={() => navigate(`/transaction/${id}/edit`)}
					/>
					<Icon
						id="fa-trash-o"
						size="18px"
						onClick={() => onTransactionRemove(id)}
					/>
				</div>
			</div>
		</li>
	);
};

export const TransactionItem = styled(TransactionItemContainer)`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 12px;
	padding: 10px 15px 10px 20px;
	font-size: 14px;
	background-color: #393d47;

	& .item-date {
		position: absolute;
		top: -7px;
		left: 82%;
		transform: translateX(-50%);
		border: 1px solid #5e636f;
		border-radius: 10px;
		padding: 1px 8px;
		font-size: 11px;
		color: #808080;
		background-color: #393d47;
	}

	& .item-column-left {
		display: flex;
	}

	& .item-column-right {
		display: flex;
	}

	& .item-comment {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-45%, -50%);
		text-align: center;
		max-width: 42%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& .item-amount {
		margin-right: 15px;
		color: ${({ category }) =>
			category.type === TYPE_CATEGORY.INCOME ? '#7bcb82' : '#f8f8f9'};
	}

	& .item-icon {
		position: relative;
		margin-right: 10px;
		border-radius: 50px;
		width: 40px;
		height: 40px;
		color: #fff;
		background-color: ${({ category }) => category.color};
	}

	& .icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-52%, -50%);
		line-height: 0;
	}

	& .item-control {
		display: flex;
	}
`;
