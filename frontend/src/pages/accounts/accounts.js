import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import { Loader } from '../../components';
import { AccountsForm } from './components';
import { selectAccounts } from '../../selectors';
import styled from 'styled-components';

// TODO доработать валидацию и вывод значения селекта
const AccountsContainer = ({ className }) => {
	const isEditing = !!useMatch('/accounts/:id/edit');
	const accounts = useSelector(selectAccounts);

	console.log('Accounts', accounts);

	if (accounts.length === 0) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование счёта' : 'Новый счёт'}</h2>
				<AccountsForm accounts={accounts} />
			</div>
		</div>
	);
};

export const Accounts = styled(AccountsContainer)`
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
		width: 281px;
		border-radius: 24px;
		padding: 20px;
		background-color: #2b2d32;
	}

	& .error {
		color: red;
	}
`;
