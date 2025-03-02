import * as yup from 'yup';

export const accountSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните название')
		.min(3, 'Неверно заполнено название. Минимум 3 символа'),
	type: yup.object({ value: yup.string() }).required('Выберите тип счёта'),
	balance: yup.number().required('Введите сумму баланса'),
});
