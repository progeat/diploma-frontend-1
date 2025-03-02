import { useMatch, useParams } from 'react-router-dom';
import { Loader } from '../../components/ui';
import { TransactionForm } from './components';
import { useTransaction } from './hooks';
import styled from 'styled-components';

// TODO продумать вывод ошибки запроса категорий
const TransactionContainer = ({ className }) => {
	const isEditing = !!useMatch('/transaction/:id/edit');
	const params = useParams();
	const dataUseTransaction = useTransaction(params.id);
	const { isLoading } = dataUseTransaction;

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование операции' : 'Новая операция'}</h2>
				<TransactionForm {...dataUseTransaction} />
			</div>
		</div>
	);
};

export const Transaction = styled(TransactionContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 285px;
		border-radius: 24px;
		padding: 15px 35px 25px 30px;
		background-color: #2b2d32;
	}
`;
