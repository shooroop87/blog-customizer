import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	// Добавляю состояние для управления открытием/закрытием сайдбара
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// Добавляю локальное состояние формы, которое не применяется сразу
	const [formState, setFormState] = useState(defaultArticleState);
	// Создаю ref для определения клика вне сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Реализую закрытие меню при клике вне формы
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				isMenuOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(target)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Обрабатываю отправку формы - применяю настройки и закрываю сайдбар
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
		setIsMenuOpen(false);
	};

	// Сбрасываю настройки к значениям по умолчанию и сразу применяю
	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Добавляю выбор шрифта через Select компонент */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>

					{/* Добавляю выбор размера шрифта через RadioGroup */}
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					{/* Добавляю выбор цвета шрифта */}
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontColor: option }))
						}
					/>

					<Separator />

					{/* Добавляю выбор цвета фона */}
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>

					{/* Добавляю выбор ширины контента */}
					<RadioGroup
						name='contentWidth'
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, contentWidth: option }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
