import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon } from '../../../../../../../../components/common';
import { Loader } from '../../../../../../../../components/ui';
import { selectIsLoadingStatistics } from '../../../../../../../../store/selectors';
import { ItemStatistics } from './components';

export const ListStatistics = ({ className, value }) => {
	const navigate = useNavigate();
	const isLoading = useSelector(selectIsLoadingStatistics);

	if (isLoading) {
		return <Loader />;
	}

	if (!value.length) {
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
		<ul className={className}>
			{value.map(({ id, category, count, total }) => (
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
