import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../../../components';
import { GET_TYPE_ACCOUNT } from '../../../../../../../../constants';
import styled from 'styled-components';

const ListAccountsComponent = ({ className, value }) => {
	const navigate = useNavigate();

	console.log('список счетов', value.length);

	if (!value.length) {
		return <div style={{ textAlign: 'center' }}>Счетов нет</div>;
	}

	return (
		<ul className={className}>
			{value.map(({ id, name, type, balance }) => (
				<li className="item" key={id}>
					<div className="item-left">
						<div className="account-name">{name}</div>
						<div className="account-type">{GET_TYPE_ACCOUNT[type]}</div>
					</div>
					<div>{balance} ₽</div>
					{name && (
						<Icon
							id="fa-pencil"
							style={{
								position: 'absolute',
								right: '-27px',
								top: '10px',
							}}
							size="18px"
							onClick={() => navigate(`/account/${id}/edit`)}
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
		padding: 5px 10px;
		border-radius: 12px;
		font-size: 16px;
		font-weight: 600;
		background-color: #393d47;
	}

	& .item:not(:last-child) {
		margin-bottom: 5px;
	}

	& .item-left {
		display: flex;
		flex-direction: column;
	}

	& .account-name {
		margin-bottom: 3px;
	}

	& .account-type {
		font-size: 12px;
		font-weight: 400;
		color: #8d8d8d;
	}
`;
