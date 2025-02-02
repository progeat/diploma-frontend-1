import * as yup from 'yup';

export const userSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	email: yup.string().email('Неверно заполнена почта').nullable(),
	phone: yup
		.string()
		.matches(
			/^$|^(\+?7|8)\d{10}$/,
			'Неверно задан номер телефона, формат +7XXXXXXXXXX',
		)
		.nullable(),
	newPassword: yup
		.string()
		.matches(
			/^$|^[\w#%]{6,}$/,
			'Неверно заполнен новый пароль. Допускаются только буквы, цифры, минимум 6 символов и знаки # %',
		)
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
		.nullable(),

	// TODO не работает привязка(выдает ошибку)
	// oldPassword: yup.string().when('newPassword', {
	// 	is: (value) => value && value.length > 0,
	// 	then: yup.string().required('Для смены пароля введите текущий пароль'),
	// 	otherwise: yup.string().nullable(),
	// }),

	oldPassword: yup
		.string()
		.matches(
			/^$|^[\w#%]{6,}$/,
			'Неверно заполнен старый пароль. Допускаются только буквы, цифры, минимум 6 символов и знаки # %',
		)
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов')
		.nullable(),
});
