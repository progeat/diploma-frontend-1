import { CategoriesList } from './components';
import styled from 'styled-components';

const CategoriesContainer = ({ className }) => {
	return (
		<div className={className}>
			<h2>Категории</h2>
			<CategoriesList />
		</div>
	);
};

export const Categories = styled(CategoriesContainer)`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 30px;
`;
