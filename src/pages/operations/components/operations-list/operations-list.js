import { useEffect, useState } from 'react';
import { OperationItem } from './components';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const OperationsListContainer = ({ className }) => {
	const [operations, setOperations] = useState([]);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchOperations').then(({ res }) => setOperations(res.operations));
	}, [requestServer]);

	console.log('operationsList', operations);
	console.log('Сколько?', operations.length);

	return (
		<>
			{operations.length > 0 ? (
				<div className={className}>
					{operations.map(
						({ id, accountId, categoryId, amount, comment, createdAt }) => (
							<OperationItem
								key={id}
								id={id}
								accountId={accountId}
								categoryId={categoryId}
								amount={amount}
								comment={comment}
								createdAt={createdAt}
							/>
						),
					)}
				</div>
			) : (
				<div className="no-operations-found">Операции не найдены</div>
			)}
		</>
	);
};

export const OperationsList = styled(OperationsListContainer)`
	& > div:not(:last-child) {
		margin-bottom: 10px;
	}
`;
