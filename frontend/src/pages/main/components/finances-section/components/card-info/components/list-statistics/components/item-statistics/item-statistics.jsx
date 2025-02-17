import { Icon } from '../../../../../../../../../../components/common';
import styled from 'styled-components';

const ItemStatisticsContainer = ({ className, category, count, total }) => {
	return (
		<li className={className}>
			<div className="item-icon">
				<Icon
					className="icon"
					id={category?.icon}
					margin="0"
					size="17px"
					color="#f8f8f9"
				/>
			</div>
			<div className="item-info">
				<div className="item-title">{category?.name}</div>
				<div className="item-count">Операций: {count}</div>
			</div>
			<div className="item-right">{total} ₽</div>
		</li>
	);
};

export const ItemStatistics = styled(ItemStatisticsContainer)`
	display: flex;
	justify-content: start;
	align-items: center;
	border-radius: 12px;
	padding: 5px 10px;
	background-color: #393d47;

	&:not(:last-child) {
		margin-bottom: 8px;
	}

	& .item-icon {
		position: relative;
		flex: none;
		margin-right: 10px;
		width: 30px;
		height: 30px;
		border-radius: 50px;
		color: #fff;
		background-color: ${({ category }) => category?.color};
	}

	& .icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-52%, -50%);
		line-height: 0;
	}

	& .item-info {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 57%;
	}

	.item-title {
		margin-bottom: 3px;
		font-size: 16px;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-count {
		font-size: 12px;
		color: #8d8d8d;
	}

	.item-right {
		white-space: nowrap;
		margin-left: auto;
		font-size: 16px;
		font-weight: 600;
	}
`;
