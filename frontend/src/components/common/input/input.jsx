import { forwardRef } from 'react';
import styled from 'styled-components';

const Label = styled.label`
	display: block;
	margin-bottom: 5px;
	font-size: 14px;
	color: #cfcfcf;
`;

const InputContainer = forwardRef(
	({ className, label, margin, width, ...props }, ref) => {
		return (
			<>
				{label && <Label>{label}</Label>}
				<input className={className} {...props} ref={ref} />
			</>
		);
	},
);

export const Input = styled(InputContainer)`
	height: 40px;
	margin: ${({ margin = '0 0 10px' }) => margin};
	width: ${({ width = '100%' }) => width};
	padding: 10px;
	font-size: 16px;
	border: 1px solid #000;
	color: #f8f8f9;
	background-color: #2b2d32;
`;
