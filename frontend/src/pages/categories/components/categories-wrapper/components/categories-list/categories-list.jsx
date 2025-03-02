import { useNavigate } from 'react-router-dom';
import { CategoriesItem } from './components';
import { Icon } from '../../../../../../components/common';
import { TYPE_CATEGORY } from '../../../../../../constants';
import styled from 'styled-components';

const CategoriesListContainer = ({ className, categories, typeCategory }) => {
	const filteredCategories = categories.filter(
		(category) => category.type === typeCategory,
	);
	const navigate = useNavigate();

	return (
		<div className={className}>
			{typeCategory === TYPE_CATEGORY.INCOME ? <h3>Доход</h3> : <h3>Расход</h3>}
			{!filteredCategories.length ? (
				<Icon
					style={{ textAlign: 'center' }}
					id="fa-plus-circle"
					margin="0"
					size="80px"
					onClick={() => navigate('/category')}
				/>
			) : (
				<ul>
					{filteredCategories.map((category) => (
						<CategoriesItem key={category.id} category={category} />
					))}
				</ul>
			)}
		</div>
	);
};

export const CategoriesList = styled(CategoriesListContainer)`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 370px;
	min-width: 320px;
	height: 100%;
	border-radius: 12px;
	padding: 12px;
	background-color: #2b2d32;

	& ul {
		width: 100%;
	}

	& ul > li:not(:last-child) {
		margin-bottom: 10px;
	}
`;
