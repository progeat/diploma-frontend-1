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

// TODO сделать константу под категории
const categoryTypeOptions = [
	{ value: 0, label: 'Расход' },
	{ value: 1, label: 'Доход' },
];

// TODO доработать валидацию и вывод значения селектора, сделать универсальный компонент под создание и редактирование
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
		request('/categories', 'POST', { name, type: type.value }).then(
			({ error, category }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				// TODO при создании категории сохранять на стор
				console.log('resp', category);
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
					{/* TODO подумать о реализации табом */}
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								className="select"
								classNamePrefix="select"
								options={categoryTypeOptions}
								placeholder="Выберите тип категории"
							/>
						)}
					/>
					<Button
						className="button-submit"
						type="submit"
						disabled={!!formError}
					>
						Отправить
					</Button>
					{errorMessage && <div className="error">{errorMessage}</div>}
				</form>
			</div>
		</div>
	);
};

// TODO переименовать в Category
export const Categories = styled(CategoriesContainer)`
	display: flex;
	justify-content: center;
	align-items: center;

	& .form-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 281px;
		border-radius: 24px;
		padding: 20px;
		background-color: #2b2d32;
	}

	& .form {
		display: flex;
		flex-direction: column;
	}

	& .form input {
		margin-bottom: 10px;
	}

	& .select {
		margin-bottom: 10px;
		width: 100%;
	}

	& .error {
		color: red;
	}

	& input {
		margin-bottom: 10px;
		border-radius: 8px;
		border-color: #5e636f;
		color: #f8f8f9;
	}

	& input:not(:first-child) {
		margin-bottom: 20px;
	}

	& input:hover {
		outline: 2px solid #f8f8f9;
	}

	& .select {
		margin-bottom: 10px;
		width: 100%;
	}

	& .select__control {
		height: 40px;
		border-radius: 8px;
		border-color: #5e636f;
	}

	& .select__control,
	.select__menu {
		background-color: #2b2d32;
	}

	& .select__placeholder,
	.select__single-value {
		color: #f8f8f9;
	}

	& .select__control:hover {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__control--is-focused {
		border-color: #f8f8f9;
		box-shadow: 0 0 0 1px #f8f8f9;
	}

	& .select__menu {
		z-index: 10;
	}

	& .select__option:hover,
	.select__option--is-focused {
		color: #2b2d32;
		background-color: #f8f8f9;
	}

	& .select__option--is-selected {
		color: #4d525f;
		background-color: rgb(179, 179, 179);
	}

	& .button-submit {
		height: 38px;
		border: 1px solid #f8f8f9;
		border-radius: 8px;
		color: #f8f8f9;
		background-color: #2b2d32;
	}

	& .button-submit:hover {
		color: #000;
		background-color: #f8f8f9;
	}
`;
