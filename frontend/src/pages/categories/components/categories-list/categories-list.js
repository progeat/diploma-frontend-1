import { useSelector } from 'react-redux';
import { CategoriesItem } from './components';
import { selectCategories } from '../../../../selectors';
import styled from 'styled-components';

const CategoriesListContainer = ({ className }) => {
	const categories = useSelector(selectCategories);

	console.log('categories', categories);

	if (!categories.length) {
		return <p>Категорий нет</p>;
	}

	return (
		<div className={className}>
			<ul>
				{categories.map((category) => (
					<CategoriesItem key={category.id} category={category} />
				))}
			</ul>
		</div>
	);
};

export const CategoriesList = styled(CategoriesListContainer)`
	display: flex;
	justify-content: center;
	padding: 20px;
`;
