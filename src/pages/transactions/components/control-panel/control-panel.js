import styled from 'styled-components';
import { Button } from '../../../../components';

const ControlPanelContainer = ({ className }) => {
	return (
		<div className={className}>
			<select value="Фильтры" onChange={() => ({})}>
				<option value="Фильтры">Фильтры</option>
				<option value="по дате">по дате</option>
				<option value="по счетам">по счетам</option>
				<option value="по категориям">по категориям</option>
			</select>
			<Button>Добавить операцию</Button>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
`;
