import { PersonalForm } from './components';
import { Loader } from '../../components/ui';
import { usePersonal } from './hooks';
import styled from 'styled-components';

const PersonalContainer = ({ className }) => {
	const { isLoading, serverError } = usePersonal();

	if (serverError) {
		<div className="error">{serverError}</div>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<PersonalForm />
		</div>
	);
};

export const Personal = styled(PersonalContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		padding: 20px;
		background-color: #ddd;
	}

	& .form {
		display: flex;
		flex-direction: column;
	}

	& .form input {
		margin-bottom: 10px;
	}
`;
