import styled from 'styled-components';
import { Icon } from '../../../../../../components';

const OperationItemContainer = ({
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
			<div className="item-comment">{comment}</div>
			<div className="item-info">{amount} ₽</div>
			<div className="item-control">
				<Icon id="fa-pencil" margin="0 7px 0 0" size="18px" />
				<Icon id="fa-trash-o" margin="0 7px 0 0" size="18px" />
			</div>
		</div>
	);
};

export const OperationItem = styled(OperationItemContainer)`
	display: flex;
	justify-content: space-between;
	border: 1px solid #000;

	& .item-control {
		display: flex;
	}
`;
