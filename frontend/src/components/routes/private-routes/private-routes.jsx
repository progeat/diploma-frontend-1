import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../store/selectors';
import { ROLE } from '../../../constants';
import { Layout } from '../../layout';

export const PrivateRoutes = () => {
	const location = useLocation();
	const roleId = useSelector(selectUserRole);

	if (roleId === ROLE.GUEST) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};
