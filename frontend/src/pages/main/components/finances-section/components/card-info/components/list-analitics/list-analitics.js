import styled from 'styled-components';

const ListAnaliticsComponent = ({ className, value }) => {
	return (
		<ul className={className}>
			{value.map(({ id, category, count, total }) => (
				<li className="item" key={id}>
					<div className="item-left">
						<div className="item-title">{category}</div>
						<div className="item-info">Операций: {count}</div>
					</div>
					<div className="item-right">{total} ₽</div>
				</li>
			))}
		</ul>
	);
};

export const ListAnalitics = styled(ListAnaliticsComponent)`
	& .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #000;
		padding: 5px;
	}

	& .item:not(:last-child) {
		margin-bottom: 5px;
	}

	& .item-left {
		display: flex;
		flex-direction: column;
	}

	.item-title {
		font-size: 16px;
		font-weight: 600;
	}

	.item-info {
		font-size: 12px;
	}

	.item-right {
		font-size: 16px;
		font-weight: 600;
	}
`;
