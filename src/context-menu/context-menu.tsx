import React from 'react';
import {Menu, PopoverStylesNames} from '@mantine/core';
import {MenuProps} from '@mantine/core';
import {useUncontrolled} from '@mantine/hooks';
import {ContextMenuProvider} from './context';
import {ContextMenuTarget} from './context-menu-target/context-menu-target';
import {TriggerEvent} from './types';

export type ContextMenuStylesNames = PopoverStylesNames;

export interface ContextMenuProps extends Omit<MenuProps, 'trigger'> {
	trigger?: TriggerEvent;
}

/** ContextMenu, Menu Wrapper make the menu(dropdown) follow the mouse click */
export const ContextMenu = (props: ContextMenuProps) => {
	const {
		opened,
		defaultOpened,
		onChange,
		onOpen,
		onClose,
		children,
		trigger = 'context',
		position = 'bottom-start',
		...others
	} = props;

	// controlled menu opened state
	const [_opened, setOpened] = useUncontrolled({
		value: opened,
		defaultValue: defaultOpened,
		finalValue: false,
		onChange,
	});

	const close = () => {
		setOpened(false);
		_opened && onClose?.();
	};

	const open = () => {
		setOpened(true);
		!_opened && onOpen?.();
	};

	const toggleDropdown = () => (_opened ? close() : open());

	return (
		<ContextMenuProvider
			value={{
				toggleDropdown,
				trigger,
			}}
		>
			<Menu
				{...others}
				trigger={trigger === 'context' ? undefined : trigger}
				opened={_opened}
				onChange={setOpened}
				defaultOpened={defaultOpened}
				position={position}
			>
				{children}
			</Menu>
		</ContextMenuProvider>
	);
};

ContextMenu.Target = ContextMenuTarget;
ContextMenu.Dropdown = Menu.Dropdown;
ContextMenu.Label = Menu.Label;
ContextMenu.Item = Menu.Item;
ContextMenu.Divider = Menu.Divider;
