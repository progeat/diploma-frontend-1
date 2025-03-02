import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../components/common';
import { ListAccounts, ListStatistics } from './components';
import styled from 'styled-components';

const CardInfoContainer = ({ className, title, path, type }) => {
	const [isValue, setIsValue] = useState(false);
	const navigate = useNavigate();

	const toggleIsValue = (value) => {
		setIsValue(value);
	};

	return (
		<div className={className}>
			<div className="header">
				<h3 className="top-panel">{title}</h3>
				{isValue && (
					<Icon id="fa-plus-circle" margin="0" onClick={() => navigate(path)} />
				)}
			</div>
			{type === 'accounts' ? (
				<ListAccounts toggleIsValue={toggleIsValue} />
			) : (
				<ListStatistics type={type} toggleIsValue={toggleIsValue} />
			)}
		</div>
	);
};

export const CardInfo = styled(CardInfoContainer)`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 1px solid transparent;
	border-radius: 24px;
	padding: 10px 12px 15px 12px;
	background-color: #2b2d32;

	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
