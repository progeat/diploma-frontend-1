import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/common';
import { setPage } from '../../../../store/actions';
import { selectTransactions } from '../../../../store/selectors';
import styled from 'styled-components';

const PaginationContainer = forwardRef(({ className }, ref) => {
	const { transactions, page, lastPage } = useSelector(selectTransactions);
	const dispatch = useDispatch();

	const onClickButton = (value) => {
		dispatch(setPage(value));
	};

	if (lastPage === 1 || transactions.length === 0) return;

	return (
		<div ref={ref} className={className}>
			<Button
				className="pagination-button"
				disabled={page === 1}
				onClick={() => onClickButton(1)}
			>
				В начало
			</Button>
			<Button
				className="pagination-button"
				disabled={page === 1}
				onClick={() => onClickButton(page - 1)}
			>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button
				className="pagination-button"
				disabled={page === lastPage}
				onClick={() => onClickButton(page + 1)}
			>
				Следующая
			</Button>
			<Button
				className="pagination-button"
				disabled={page === lastPage}
				onClick={() => onClickButton(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
});

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	width: 100%;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		text-align: center;
		margin: 0px 5px;
		width: 100%;
		height: 32px;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
	}

	& .pagination-button {
		color: #080808;
		background-color: #d1d1d1;
	}

	& .pagination-button:hover {
		background-color: #f8f8f9;
	}

	& .pagination-button:disabled {
		border-color: #393d47;
		color: #141414;
		background-color: #393d47;
	}
`;
