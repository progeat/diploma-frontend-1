import styled from 'styled-components';

const ListAnalyticsComponent = ({ className, value }) => {
	if (!value.length) {
		return <div style={{ textAlign: 'center' }}>Операций нет</div>;
	}

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

export const ListAnalytics = styled(ListAnalyticsComponent)`
	& .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 12px;
		padding: 5px 10px;
		background-color: #393d47;
	}

	& .item:not(:last-child) {
		margin-bottom: 8px;
	}

	& .item-left {
		display: flex;
		flex-direction: column;
	}

	.item-title {
		margin-bottom: 3px;
		font-size: 16px;
		font-weight: 600;
	}

	.item-info {
		font-size: 12px;
		color: #8d8d8d;
	}

	.item-right {
		font-size: 16px;
		font-weight: 600;
	}
`;
