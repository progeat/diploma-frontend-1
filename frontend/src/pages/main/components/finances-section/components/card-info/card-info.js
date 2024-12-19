import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../components';
import styled from 'styled-components';

const CardInfoContainer = ({ className, title, value, path }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div className="header">
				<h3 className="top-panel">{title}</h3>
				<Icon id="fa-plus-circle" margin="0" onClick={() => navigate(path)} />
			</div>
			<ul className="list-expenses">
				{value.map(({ id, category, count, total }) => (
					<li className="item" key={id}>
						<div>{category}</div>
						<div>Операций: {count}</div>
						<div>{total} ₽</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export const CardInfo = styled(CardInfoContainer)`
	display: flex;
	flex-direction: column;
	width: 100%;
	border: 2px solid #000;
	padding: 10px;

	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .item {
		display: flex;
		justify-content: space-between;
		border: 1px solid #000;
		padding: 5px;
	}

	& .item:not(:last-child) {
		margin-bottom: 5px;
	}
`;
