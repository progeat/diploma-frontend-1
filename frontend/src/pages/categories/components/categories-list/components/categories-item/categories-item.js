import styled from 'styled-components';

const CategoriesItemContainer = ({ className, category }) => {
	console.log('category', category);

	return (
		<li className={className}>
			<div>{category.name}</div>
		</li>
	);
};

export const CategoriesItem = styled(CategoriesItemContainer)`
	display: flex;
	padding: 10px 20px;
`;
