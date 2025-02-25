import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Icon, Input, TabSwitcher } from '../../../../components/common';
import { SelectForm } from '../../../../components/form';
import { categorySchema } from '../../../../utils/validators';
import { CATEGORY_TYPE_OPTIONS, ICON_OPTIONS } from './constants';
import styled from 'styled-components';

const FormatOptionLabel = ({ value, label }) => {
	return (
		<article className="icon-option">
			<Icon
				color="#fff"
				inactive="true"
				id={value}
				size="18px"
				margin="0 10px 0 0"
				onClick={() => {}}
			/>
			<div>{label}</div>
		</article>
	);
};

const CategoryFormContainer = ({
	className,
	category,
	categoryError,
	onSubmitCategory,
	onDeleteCategory,
	isServerPass,
	resetServerStatus,
}) => {
	let indexTypeCategoryEdited = CATEGORY_TYPE_OPTIONS.findIndex(
		(option) => option.value === category?.type,
	);

	if (indexTypeCategoryEdited < 0) {
		indexTypeCategoryEdited = 0;
	}

	const [indexActive, setIndexActive] = useState(indexTypeCategoryEdited || 0);
	const indexIconCategoryEdited = ICON_OPTIONS.findIndex(
		(option) => option.value === category?.icon,
	);

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: category?.name || '',
			icon: ICON_OPTIONS[indexIconCategoryEdited] || null,
			color: category?.color || '#78D9C5',
		},
		resolver: yupResolver(categorySchema),
	});

	const onToggleActive = (index) => {
		setIndexActive(index);
	};

	const formError = errors?.name?.message || errors?.type?.message;
	const errorMessage = formError || categoryError;

	return (
		<form
			className={className}
			onSubmit={handleSubmit(({ name, color, icon }) =>
				onSubmitCategory({
					formData: {
						name,
						type: CATEGORY_TYPE_OPTIONS[indexActive].value,
						color,
						icon: icon.value,
					},
					resetForm: reset,
				}),
			)}
		>
			<div className="switcher-wrapper">
				<TabSwitcher
					className="switcher"
					names={[
						CATEGORY_TYPE_OPTIONS[0].label,
						CATEGORY_TYPE_OPTIONS[1].label,
					]}
					indexActive={indexActive}
					onToggleActive={onToggleActive}
				/>
			</div>
			<Input
				label="Имя"
				type="text"
				placeholder="Название категории..."
				{...register('name', {
					onChange: resetServerStatus,
				})}
			/>
			<SelectForm
				label="Иконка"
				name="icon"
				control={control}
				options={ICON_OPTIONS}
				formatOptionLabel={FormatOptionLabel}
				placeholder="Выберите иконку"
			/>
			<Input
				label="Цвет"
				type="color"
				placeholder="Выберите цвет..."
				{...register('color', {
					onChange: resetServerStatus,
				})}
			/>
			<Button className="button-submit" type="submit" disabled={!!formError}>
				Отправить
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
			{isServerPass && <div className="pass">Отправленно</div>}
			{category && (
				<button
					className="delete-button"
					type="button"
					onClick={onDeleteCategory}
				>
					Удалить категорию
				</button>
			)}
		</form>
	);
};

export const CategoryForm = styled(CategoryFormContainer)`
	display: flex;
	flex-direction: column;

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

	& input:hover {
		outline: 2px solid #f8f8f9;
	}

	& .icon-option,
	icon-single-value {
		display: flex;
	}

	& .switcher-wrapper {
		margin-bottom: 10px;
	}

	& .switcher {
		justify-content: center;
	}

	& .button-submit {
		margin: 10px 0;
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

	& .delete-button {
		text-align: left;
		width: max-content;
		border: 0;
		color: rgb(156, 156, 156);
		background-color: inherit;
		cursor: pointer;
	}

	& .delete-button:hover {
		color: #f8f8f9;
	}

	& .pass {
		color: #6ccb81;
	}

	& .error {
		color: rgb(203, 108, 108);
	}
`;
