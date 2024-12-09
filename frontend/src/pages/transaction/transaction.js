import { useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { Loader } from '../../components';
import { request } from '../../utils';
import styled from 'styled-components';
import { TransactionForm } from './components';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories } from '../../selectors';

const TransactionContainer = ({ className }) => {
	const [transaction, setTransaction] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const params = useParams();
	const isEditing = !!useMatch('/transaction/:id/edit');
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	useEffect(() => {
		if (!isEditing) {
			return;
		}

		setIsLoading(true);

		request(`/transactions/${params.id}`).then((transactionRes) => {
			if (transactionRes.error) {
				console.error(transactionRes.error);
			}

			setTransaction(transactionRes.data);
			setIsLoading(false);
		});
	}, [isEditing, params.id]);

	if (isLoading) {
		return <Loader />;
	}

	if (accounts.length === 0 && categories.length === 0) {
		return <Loader />;
	}

	// TODO сброс значения для селекта после отправки формы
	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование операции' : 'Новая операция'}</h2>
				<TransactionForm
					transaction={transaction}
					transactionId={params?.id}
					accounts={accounts}
					categories={categories}
				/>
			</div>
		</div>
	);
};

// TODO перенести стили в свои компонеты
export const Transaction = styled(TransactionContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 35px 25px 35px;
		background-color: #ddd;
	}

	& .form {
		display: flex;
		flex-direction: column;
		min-width: 220px;
	}

	& .form input {
		margin-bottom: 10px;
	}

	& .select-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	& .select {
		margin-bottom: 10px;
		width: 100%;
	}

	& .error {
		color: red;
	}
`;
