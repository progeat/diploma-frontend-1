import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../../../components';
import styled from 'styled-components';

// TODO подумать над получением пропсов и отсутствием значений
const CardInfoContainer = ({ className, title, value, path }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<div className="header">
				<h3 className="top-panel">{title}</h3>
				<Icon id="fa-plus-circle" margin="0" onClick={() => navigate(path)} />
			</div>
			<ul className="list-expenses">
				{value.map(({ id, amount, comment, name, balance }) => (
					<li className={`item ${name ? 'item-account' : ''}`} key={id}>
						<div>{comment || name}</div>
						<div>{amount || balance} ₽</div>
						{name && (
							<Icon
								id="fa-pencil"
								style={{
									position: 'absolute',
									right: '-27px',
									top: '2px',
								}}
								size="18px"
								onClick={() => navigate(`/accounts/${id}/edit`)}
							/>
						)}
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

	& .link-wrapper {
		border: 1px solid #000;
		padding: 5px;
		font-size: 20px;
	}

	& .item {
		display: flex;
		justify-content: space-between;
		border: 1px solid #000;
		padding: 5px;
	}

	& .item-account {
		position: relative;
		margin-right: 27px;
	}

	& .item:not(:last-child) {
		margin-bottom: 5px;
	}
`;
