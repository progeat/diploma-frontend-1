import { Icon, Input } from '../../../../components/common';
import { useSearch } from './hooks';
import styled from 'styled-components';

const SearchContainer = ({ className }) => {
	const { inputSearchPhrase, onSearch } = useSearch();

	return (
		<div className={className}>
			<Input
				value={inputSearchPhrase}
				placeholder="Поиск по комментариям..."
				margin="0"
				onChange={onSearch}
			/>
			<div className="icon-wrapper">
				<Icon
					inactive="true"
					id="fa-search"
					size="19px"
					style={{ color: '#f8f8f9' }}
				/>
			</div>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;

	& > input {
		width: 100%;
		height: 60px;
		border: 1px solid #5e636f;
		border-radius: 22px;
		padding: 10px 70px 8px 15px;
		background-color: #2b2d32;
	}

	& > input:hover {
		border-color: #cfcfcf;
	}

	& .icon-wrapper {
		position: absolute;
		top: 3px;
		right: 3px;
		width: 54px;
		height: 54px;
		border-radius: 20px;
		background-color: #4d525f;
	}

	& .icon-wrapper > div {
		position: absolute;
		top: 49%;
		left: 51%;
		transform: translate(-50%, -50%);
	}
`;
