const namesMonths = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

export const getNamesOfPastMonths = (counts = 1) => {
	const names = [];
	let monthIndex = new Date().getMonth();

	for (let i = counts; i > 0; i--) {
		if (monthIndex < 0) {
			monthIndex += 12;
		}

		names.push(namesMonths[monthIndex]);

		monthIndex--;
	}

	return names;
};
