import styled from 'styled-components';
import { Icon } from '../../../../../../../../components';
import { useNavigate } from 'react-router-dom';

const ListAccountsComponent = ({ className, value }) => {
	const navigate = useNavigate();

	return (
		<ul className={className}>
			{value.map(({ id, amount, comment, name, balance }) => (
				<li className="item" key={id}>
					<div>{comment || name}</div>
					<div>{amount || balance} ₽</div>
					{name && (
						<Icon
							id="fa-pencil"
							style={{
								position: 'absolute',
								right: '-27px',
								top: '2px',
							}}
							size="18px"
							onClick={() => navigate(`/accounts/${id}/edit`)}
						/>
					)}
				</li>
			))}
		</ul>
	);
};

export const ListAccounts = styled(ListAccountsComponent)`
	& .item {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 27px;
		border: 1px solid #000;
		padding: 5px;
	}

	& .item:not(:last-child) {
		margin-bottom: 5px;
	}

	& .item-left {
		display: flex;
		flex-direction: column;
	}

	.item-title {
		font-size: 16px;
		font-weight: 600;
	}

	.item-info {
		font-size: 12px;
	}

	.item-right {
		font-size: 16px;
		font-weight: 600;
	}
`;
