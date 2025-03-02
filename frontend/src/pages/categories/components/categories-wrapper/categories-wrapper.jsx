import { CategoriesList } from './components';
import { Loader } from '../../../../components/ui';
import { useCategories } from '../../../../hooks';
import { TYPE_CATEGORY } from '../../../../constants';
import styled from 'styled-components';

const CategoriesWrapperContainer = ({ className }) => {
	const { categories, isLoading, error } = useCategories();

	if (isLoading || !categories) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<CategoriesList categories={categories} typeCategory={TYPE_CATEGORY.INCOME} />
			<CategoriesList
				categories={categories}
				typeCategory={TYPE_CATEGORY.EXPENSE}
			/>
		</div>
	);
};

export const CategoriesWrapper = styled(CategoriesWrapperContainer)`
	display: flex;
	justify-content: center;

	& > div:not(:last-child) {
		margin-right: 20px;
	}
`;
