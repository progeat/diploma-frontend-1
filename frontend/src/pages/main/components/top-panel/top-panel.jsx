import { useSelector } from 'react-redux';
import { TabSwitcher } from '../../../../components/common';
import { useStatistics } from '../../hooks';
import { getNamesOfPastMonths, getTotalPrice, getTotalSavings } from './utils';
import styled from 'styled-components';
import { selectAccounts } from '../../../../store/selectors';

const TopPanelContainer = ({ className }) => {
	const { statistics, indexSelect, onToggleSelect } = useStatistics();
	const { accounts } = useSelector(selectAccounts);
	const totalSavings = getTotalSavings(accounts);
	const namesTabSwitcher = getNamesOfPastMonths(3);

	return (
		<div className={className}>
			<div className="left">
				<div className="total-info">
					Всего накоплений:
					<span className="total-price">{totalSavings} ₽</span>
				</div>
			</div>
			<div className="right">
				<div className="switcher-wrapper">
					<span className="title-switcher">Период за:</span>
					<TabSwitcher
						names={namesTabSwitcher}
						indexActive={indexSelect}
						onToggleActive={onToggleSelect}
					/>
				</div>
				<div className="info-wrapper">
					<div className="total-info">
						Расход:
						<span className="total-price">
							{getTotalPrice(statistics?.expenses) || 0} ₽
						</span>
					</div>
					<div className="total-info">
						Доход:
						<span className="total-price">
							{getTotalPrice(statistics?.income) || 0} ₽
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export const TopPanel = styled(TopPanelContainer)`
	display: flex;
	align-items: center;
	padding: 20px 20px 0;

	& .left {
		margin-right: 10px;
	}

	& .right {
		display: flex;
		align-items: center;
	}

	& .switcher-wrapper,
	.info-wrapper {
		display: flex;
		align-items: center;
		column-gap: 10px;
	}

	& .switcher-wrapper {
		margin-right: 10px;
	}

	& .title-switcher {
		color: #888;
	}

	& .total-info {
		color: #888;
	}

	& .total-price {
		margin-left: 5px;
		font-weight: 600;
		color: #f8f8f9;
	}
`;
