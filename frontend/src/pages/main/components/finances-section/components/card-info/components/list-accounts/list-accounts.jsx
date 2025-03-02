import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../../../components/common';
import { Loader } from '../../../../../../../../components/ui';
import { useAccounts } from '../../../../../../../../hooks';
import { GET_TYPE_ACCOUNT } from '../../../../../../../../constants';
import styled from 'styled-components';

const ListAccountsComponent = ({ className, toggleIsValue }) => {
	const navigate = useNavigate();
	const { accounts, isLoading } = useAccounts();

	useEffect(() => {
		if (accounts && accounts.length > 0) {
			toggleIsValue(true);
		} else {
			toggleIsValue(false);
		}
	}, [accounts]);

	if (isLoading || !accounts) {
		return <Loader />;
	}

	if (!accounts.length) {
		return (
			<Icon
				style={{ textAlign: 'center' }}
				id="fa-plus-circle"
				margin="0"
				size="80px"
				onClick={() => navigate('/account')}
			/>
		);
	}

	return (
		<ul className={className}>
			{accounts.map(({ id, name, type, balance }) => (
				<li className="item" key={id}>
					<div className="item-left">
						<div className="account-name">{name}</div>
						<div className="account-type">{GET_TYPE_ACCOUNT[type]}</div>
					</div>
					<div className="balance">{balance} ₽</div>
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
		background-color: #393d47;
	}

	& .item:not(:last-child) {
		margin-bottom: 8px;
	}

	& .item-left {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 57%;
	}

	& .account-name {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 3px;
		font-size: 15px;
		font-weight: 600;
	}

	& .account-type {
		font-size: 12px;
		font-weight: 400;
		color: #8d8d8d;
	}

	& .balance {
		white-space: nowrap;
		font-size: 15px;
		font-weight: 600;
	}
`;
