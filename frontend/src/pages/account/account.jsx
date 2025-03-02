import { useMatch, useParams } from 'react-router-dom';
import { AccountForm } from './components';
import { Loader } from '../../components/ui';
import { useAccount } from './hooks';
import styled from 'styled-components';

const AccountContainer = ({ className }) => {
	const isEditing = !!useMatch('/account/:id/edit');
	const params = useParams();
	const dataUseAccount = useAccount(params.id);
	const { isLoading } = dataUseAccount;

	if (isEditing && isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование счёта' : 'Новый счёт'}</h2>
				<AccountForm {...dataUseAccount} />
			</div>
		</div>
	);
};

export const Account = styled(AccountContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 285px;
		border-radius: 24px;
		padding: 15px 30px;
		background-color: #2b2d32;
	}
`;
