const baseUrl = '/api';

export function request(url, method, data) {
	url = baseUrl + url;

	return fetch(url, {
		headers: {
			'content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	})
		.then((res) => res.json())
		.catch((e) => {
			console.error('Ошибка:', e.message);

			throw new Error(`Ошибка: ${e.message}`);
		});
}
