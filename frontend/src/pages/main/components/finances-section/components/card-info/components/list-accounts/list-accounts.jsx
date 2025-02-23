import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon } from '../../../../../../../../components/common';
import { Loader } from '../../../../../../../../components/ui';
import { selectIsLoadingAccounts } from '../../../../../../../../store/selectors';
import { GET_TYPE_ACCOUNT } from '../../../../../../../../constants';
import styled from 'styled-components';
import { useAccounts } from '../../../../../../../../hooks';
import { useEffect } from 'react';

const ListAccountsComponent = ({ className }) => {
	const navigate = useNavigate();
	const { accounts, isLoading, error, loadAccounts } = useAccounts();

	useEffect(() => {
		loadAccounts();
	}, []);

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
		width: 100%;
		max-width: 57%;
	}

	& .account-name {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 3px;
	}

	& .account-type {
		font-size: 12px;
		font-weight: 400;
		color: #8d8d8d;
	}

	& .balance {
		white-space: nowrap;
	}
`;
