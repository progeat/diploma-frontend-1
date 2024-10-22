import { getOperations } from '../api';

export const fetchOperations = async () => {
	const operations = await getOperations();

	console.log('fetchOperations operations', operations);

	return {
		error: null,
		res: {
			operations,
		},
	};
};
