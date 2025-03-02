import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from '../../layout';
import { selectAppError, selectUserRole } from '../../../store/selectors';
import { ROLE } from '../../../constants';
import { useEffect } from 'react';

export const PrivateRoutes = () => {
	const roleId = useSelector(selectUserRole);
	const error = useSelector(selectAppError);
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			navigate('/error');
			return;
		}
	}, [error]);

	if (roleId === ROLE.GUEST) {
		return <Navigate to="/login" />;
	}

	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};
