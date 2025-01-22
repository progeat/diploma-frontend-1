import styled from 'styled-components';
import { CategoriesItem } from './components';

const CategoriesListContainer = ({ className }) => {
	return (
		<div className={className}>
			<ul>
				<CategoriesItem />
			</ul>
		</div>
	);
};

export const CategoriesList = styled(CategoriesListContainer)`
	display: flex;
	justify-content: center;
	padding: 20px;
`;
