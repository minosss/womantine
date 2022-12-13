import {TextProps} from '@mantine/core';
import {
	Button,
	ButtonProps,
	Group,
	Popover,
	PopoverProps,
	Text,
	useComponentDefaultProps,
} from '@mantine/core';
import {useUncontrolled} from '@mantine/hooks';
import {isElement, createEventHandler} from '@mantine/utils';
import React, {forwardRef} from 'react';

export interface ConfirmPopoverProps extends PopoverProps {
	onConfirm?(): void;
	confirmProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;

	onCancel?(): void;
	cancelProps?: ButtonProps & React.ComponentPropsWithoutRef<'button'>;

	labels?: Partial<Record<'confirm' | 'cancel', React.ReactNode>>;

	title?: string;
	titleProps?: TextProps;
	description?: React.ReactNode;
}

const defaultProps: Partial<ConfirmPopoverProps> = {
	labels: {cancel: 'Cancel', confirm: 'Confirm'},
};

export const ConfirmPopover = forwardRef<HTMLDivElement, ConfirmPopoverProps>((props, ref) => {
	const {
		title,
		titleProps,
		description,
		onCancel,
		onConfirm,
		labels,
		confirmProps,
		cancelProps,
		children,
		opened,
		defaultOpened,
		onChange,
		...others
	} = useComponentDefaultProps('ConfirmPopover', defaultProps, props);

	if (!isElement(children)) {
		throw new Error(
			`ConfirmPopover.Target component children should be an element or a component that accepts ref`
		);
	}

	const [_opened, setOpened] = useUncontrolled({
		defaultValue: defaultOpened,
		finalValue: false,
		onChange,
		value: opened,
	});
	const handleConfirm = () => {
		onConfirm?.();
		setOpened(false);
	};

	const handleCancel = () => {
		onCancel?.();
		setOpened(false);
	};

	return (
		<Popover opened={_opened} onChange={setOpened} withArrow withinPortal {...others} closeOnEscape>
			<Popover.Target>
				{React.cloneElement(children, {
					onClick: createEventHandler(children.props?.onClick, () => {
						setOpened(true);
					}),
					ref,
				})}
			</Popover.Target>
			<Popover.Dropdown>
				{title && <Text weight={500} {...titleProps}>{title}</Text>}
				{description}
				{(labels.confirm || labels.cancel) && (
					<Group position='right' mt='xs'>
						{labels.cancel && (
							<Button
								size='xs'
								variant='subtle'
								{...cancelProps}
								onClick={handleCancel}
							>
								{labels.cancel}
							</Button>
						)}
						{labels.confirm && (
							<Button size='xs' {...confirmProps} onClick={handleConfirm}>
								{labels.confirm}
							</Button>
						)}
					</Group>
				)}
			</Popover.Dropdown>
		</Popover>
	);
});

ConfirmPopover.displayName = 'ConfirmPopover';
