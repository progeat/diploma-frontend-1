import { Controller } from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-size: 14px;
	color: #cfcfcf;
`;

const SelectFormContainer = ({ className, label, name, control, options, ...props }) => {
	return (
		<div className={className}>
			{label && <Label>{label}</Label>}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						className="select"
						classNamePrefix="select"
						options={options}
						{...props}
					/>
				)}
			/>
		</div>
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
		border: 1px solid #5e636f;
		border-radius: 8px;
		padding: 5px;
		background-color: #3f4147;
	}

	& .select__option {
		border-radius: 8px;
	}

	& .select__option:hover,
	.select__option--is-focused {
		color: #2b2d32;
		background-color: #f8f8f9;
	}

	& .select__option:hover i,
	.select__option--is-focused i {
		color: #2b2d32;
	}

	& .select__option--is-selected {
		color: #4d525f;
		background-color: rgb(179, 179, 179);
	}

	& .select__option--is-selected i {
		color: #2b2d32;
	}
`;
