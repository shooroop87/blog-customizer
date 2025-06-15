import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (option: OptionType) => void;
	selected?: OptionType;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
		selected,
		option,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	// Изменяю обработчик клика - передаю весь объект option вместо только value
	const handleClick: MouseEventHandler<HTMLLIElement> = () => {
		onClick(option);
	};

	// Обновляю hook для передачи полного объекта option
	useEnterOptionSubmit({
		optionRef,
		value,
		onClick: () => onClick(option),
	});

	// Добавляю проверку выбранной опции для правильного отображения
	const isSelected = selected?.value === value;

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			data-selected={isSelected}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};
