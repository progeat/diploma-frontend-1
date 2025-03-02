import styled from 'styled-components';

const TabSwitcherContainer = ({
	className,
	names,
	indexActive,
	onToggleActive,
	...props
}) => {
	return (
		<div className={className} {...props}>
			<div className="buttons-wrapper">
				{names.map((name, index) => (
					<button
						key={name}
						className="tab-button"
						onClick={() => onToggleActive(index)}
						disabled={index === indexActive}
					>
						{name}
					</button>
				))}
			</div>
		</div>
	);
};

export const TabSwitcher = styled(TabSwitcherContainer)`
	display: flex;

	& .buttons-wrapper {
		display: flex;
		column-gap: 10px;
		border: 2px solid #2b2d32;
		border-radius: 8px;
		background-color: #2b2d32;
	}

	& .tab-button {
		padding: 3px 10px;
		font-size: 16px;
		width: 100%;
		color: #888;
		border: 1px solid #2b2d32;
		border-radius: 8px;
		background-color: #2b2d32;
	}

	& .tab-button:disabled {
		color: #141414;
		background-color: #f8f8f9;
	}

	& .tab-button:not(:disabled):hover {
		color: #eee;
		background-color: #2b2d32;
		cursor: pointer;
	}
`;
