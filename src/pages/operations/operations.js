import styled from 'styled-components';
import { ControlPanel, OperationsList } from './components';

const OperationsContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="header">
				<h2>История операций</h2>
				<ControlPanel />
			</div>
			<OperationsList />
		</div>
	);
};

export const Operations = styled(OperationsContainer)`
	& .header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
