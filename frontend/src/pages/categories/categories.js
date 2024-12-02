import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { Button, Input } from '../../components';
import styled from 'styled-components';
import { request } from '../../utils';

const categoryFormSchema = yup.object().shape({
	name: yup
		.string()
		.required('Заполните название')
		.min(3, 'Неверно заполнено название. Минимум 3 символа'),
	type: yup.object({ value: yup.number() }).required('Выберите тип категории'),
});

const categoryTypeOptions = [
	{ value: 0, label: 'Расход' },
	{ value: 1, label: 'Доход' },
];

// TODO доработать валидацию и вывод значения селекта
const CategoriesContainer = ({ className }) => {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			type: categoryTypeOptions[0],
			balance: 0,
		},
		resolver: yupResolver(categoryFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const onSubmit = ({ name, type }) => {
		// console.log('name', name);
		// console.log('type', type.value);
		request('/categories', 'POST', { name, type: type.value }).then(
			({ error, category }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				console.log('resp', category);
				// dispatch(setUser(user));
				reset();
			},
		);
	};

	const formError = errors?.name?.message || errors?.type?.message;
	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<div className="form-wrapper">
				<h2>Новая категория</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						placeholder="Название категории..."
						{...register('name', {
							onChange: () => setServerError(null),
						})}
					/>
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								options={categoryTypeOptions}
								// defaultValue={accountTypeOptions[0]}
								placeholder="Выберите тип категории"
							/>
						)}
					/>
					<Button type="submit" disabled={!!formError}>
						Отправить
					</Button>
					{errorMessage && <div className="error">{errorMessage}</div>}
				</form>
			</div>
		</div>
	);
};

export const Categories = styled(CategoriesContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		padding: 20px;
		background-color: #ddd;
	}

	& .form {
		display: flex;
		flex-direction: column;
	}

	& .form input {
		margin-bottom: 10px;
	}

	& .error {
		color: red;
	}
`;
