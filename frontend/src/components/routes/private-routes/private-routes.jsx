import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from '../../layout';
import { selectUserRole } from '../../../store/selectors';
import { ROLE } from '../../../constants';

export const PrivateRoutes = () => {
	const roleId = useSelector(selectUserRole);

	if (roleId === ROLE.GUEST) {
		return <Navigate to="/login" />;
	}

	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};
