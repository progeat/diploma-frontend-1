import { transformOperation } from '../transformers';

export const getOperations = () =>
	fetch('http://localhost:3005/operations')
		.then((loadedOperations) => loadedOperations.json())
		.then((loadedOperations) => loadedOperations.map(transformOperation));
