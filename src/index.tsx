import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Добавляю состояние для хранения примененных настроек статьи
	const [articleState, setArticleState] = useState(defaultArticleState);

	// Создаю обработчик для применения новых настроек от формы
	const handleApplySettings = (newSettings: ArticleStateType) => {
		setArticleState(newSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					// Применяю CSS-переменные на основе состояния приложения
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			{/* Передаю callback для применения настроек в форму */}
			<ArticleParamsForm onApply={handleApplySettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
