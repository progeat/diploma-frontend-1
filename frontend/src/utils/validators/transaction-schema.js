import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
	amount: yup.number().required('Введите сумму'),
	categorySelected: yup.object({ value: yup.string() }).required('Выберите категорию'),
	accountSelected: yup.object({ value: yup.string() }).required('Выберите счёт'),
	comment: yup
		.string()
		.required('Введите комментарий')
		.min(2, 'Неверно заполнен комментарий. Минимум 2 символа'),
});
