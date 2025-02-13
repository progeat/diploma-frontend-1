import * as yup from 'yup';

export const categorySchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните название')
		.min(3, 'Неверно заполнено название. Минимум 3 символа'),
	icon: yup.object({ value: yup.string() }).required('Выберите иконку'),
	color: yup.string().required('Выберите цвет для иконки'),
});
