import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ItemStatistics } from './components';
import { Icon } from '../../../../../../../../components/common';
import { Loader } from '../../../../../../../../components/ui';
import { selectStatistics } from '../../../../../../../../store/selectors';

export const ListStatistics = ({ type, toggleIsValue }) => {
	const navigate = useNavigate();
	const { statistics, isLoading } = useSelector(selectStatistics);
	const statisticsCategory = statistics[type];

	useEffect(() => {
		if (statisticsCategory && statisticsCategory.length > 0) {
			toggleIsValue(true);
		} else {
			toggleIsValue(false);
		}
	}, [statisticsCategory]);

	if (isLoading) {
		return <Loader />;
	}

	if (!statisticsCategory.length) {
		return (
			<Icon
				style={{ textAlign: 'center' }}
				id="fa-plus-circle"
				margin="0"
				size="80px"
				onClick={() => navigate('/transaction')}
			/>
		);
	}

	return (
		<ul>
			{statisticsCategory.map(({ id, category, count, total }) => (
				<ItemStatistics
					key={id}
					category={category}
					count={count}
					total={total}
				/>
			))}
		</ul>
	);
};
