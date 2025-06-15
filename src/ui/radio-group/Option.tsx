import { useRef, useEffect } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

import styles from './RadioGroup.module.scss';

type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props;
	const optionRef = useRef<HTMLDivElement>(null);

	const handleChange = () => onChange?.(option);

	// Добавляю обработку нажатия Enter для accessibility
	useEffect(() => {
		const optionElement = optionRef.current;
		if (!optionElement) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				onChange?.(option);
			}
		};

		optionElement.addEventListener('keydown', handleKeyDown);

		return () => {
			optionElement.removeEventListener('keydown', handleKeyDown);
		};
	}, [onChange, option]);

	const inputId = `${groupName}_radio_item_with_value__${value}`;
	// Исправляю логику проверки выбранного элемента - сравниваю по value
	const isChecked = value === selected.value;

	return (
		<div
			className={styles.item}
			key={value}
			data-checked={isChecked}
			data-testid={inputId}
			tabIndex={0}
			ref={optionRef}>
			<input
				className={styles.input}
				type='radio'
				name={groupName}
				id={inputId}
				value={value}
				checked={isChecked}
				onChange={handleChange}
				tabIndex={-1}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};
