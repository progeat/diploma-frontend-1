import { Controller } from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';

const SelectFormContainer = ({ className, name, control, options, ...props }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Select
					{...field}
					className={className}
					classNamePrefix="select"
					options={options}
					{...props}
				/>
			)}
		/>
	);
};

export const SelectForm = styled(SelectFormContainer)`
	margin-bottom: 10px;
	width: 100%;

	& .select__control {
		height: 40px;
		border-radius: 8px;
		border-color: #5e636f;
	}

	& .select__control,
	.select__menu {
		background-color: #2b2d32;
	}

	& .select__placeholder,
	.select__single-value {
		color: #f8f8f9;
	}

	& .select__control:hover {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__control--is-focused {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__menu {
		z-index: 10;
	}

	& .select__option:hover,
	.select__option--is-focused {
		color: #2b2d32;
		background-color: #f8f8f9;
	}

	& .select__option--is-selected {
		color: #4d525f;
		background-color: rgb(179, 179, 179);
	}
`;
