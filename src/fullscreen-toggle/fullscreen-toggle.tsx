import {ActionIcon, ActionIconProps, Tooltip, useComponentDefaultProps} from '@mantine/core';
import {useFullscreen} from '@mantine/hooks';
import {FullscreenIcon} from './fullscreen-icon';

export interface FullscreenToggleProps extends ActionIconProps {
	labels?: Record<'enter' | 'exit', string>;
}

const defaultProps: Partial<FullscreenToggleProps> = {
	labels: {
		enter: 'Enter Full Screen',
		exit: 'Exit Full Screen',
	},
};

export const FullscreenToggle: React.FC<FullscreenToggleProps> = (props) => {
	const {labels, ...others} = useComponentDefaultProps(
		'FullscreenToggle',
		defaultProps,
		props
	);
	const {fullscreen, toggle} = useFullscreen();

	return (
		<Tooltip label={fullscreen ? labels.exit : labels.enter}>
			<ActionIcon
				onClick={toggle}
				sx={(theme) => ({
					// use primary color as active state
					color: fullscreen ? theme.fn.primaryColor() : undefined,
				})}
				{...others}
			>
				<FullscreenIcon />
			</ActionIcon>
		</Tooltip>
	);
};
