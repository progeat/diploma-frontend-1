import { useMatch, useParams } from 'react-router-dom';
import { CategoryForm } from './components';
import { Loader } from '../../components/ui';
import { useCategory } from './hooks';
import styled from 'styled-components';

const CategoryContainer = ({ className }) => {
	const isEditing = !!useMatch('/category/:id/edit');
	const params = useParams();
	const dataUseCategory = useCategory(params.id);
	const { isLoading } = dataUseCategory;

	if (isEditing && isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>{isEditing ? 'Редактирование категории' : 'Новая категория'}</h2>
				<CategoryForm {...dataUseCategory} />
			</div>
		</div>
	);
};

export const Category = styled(CategoryContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		border-radius: 24px;
		padding: 20px;
		background-color: #2b2d32;
	}
`;
