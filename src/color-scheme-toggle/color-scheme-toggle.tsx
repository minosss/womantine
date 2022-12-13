import {
	useMantineColorScheme,
	ActionIcon,
	Tooltip,
	ActionIconProps,
	useComponentDefaultProps,
} from '@mantine/core';
import {DarkIcon} from './dark-icon';
import {LightIcon} from './light-icon';

export interface ColorSchemeToggleProps extends ActionIconProps {
	labels?: Record<'light' | 'dark', string>;
}

const defaultProps: Partial<ColorSchemeToggleProps> = {
	labels: {
		dark: 'Dark Mode',
		light: 'Light Mode',
	},
};

export const ColorSchemeToggle: React.FC<ColorSchemeToggleProps> = (props) => {
	const {labels, ...others} = useComponentDefaultProps(
		'ColorSchemeToggle',
		defaultProps,
		props
	);
	const {colorScheme, toggleColorScheme} = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	return (
		<Tooltip label={isDark ? labels.light : labels.dark}>
			<ActionIcon onClick={() => toggleColorScheme(isDark ? 'light' : 'dark')} {...others}>
				{isDark ? <DarkIcon /> : <LightIcon />}
			</ActionIcon>
		</Tooltip>
	);
};
