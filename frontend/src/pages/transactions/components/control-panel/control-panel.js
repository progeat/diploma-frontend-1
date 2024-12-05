import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ControlPanelContainer = ({ className }) => {
	return (
		<div className={className}>
			<select value="Фильтры" onChange={() => ({})}>
				<option value="Фильтры">Фильтры</option>
				<option value="по дате">по дате</option>
				<option value="по счетам">по счетам</option>
				<option value="по категориям">по категориям</option>
			</select>
			<Link to="/transaction">Добавить операцию</Link>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;

	& > a {
		border: 1px solid #000;
		padding: 5px;
	}
`;
