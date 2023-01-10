import {Menu, MenuTargetProps} from '@mantine/core';
import {createEventHandler, isElement} from '@mantine/utils';
import React, {cloneElement, forwardRef} from 'react';
import {useContextMenuContext} from '../context';

interface RefWrapperProps extends React.PropsWithChildren<{refProp?: string}> {}

/** ref wrapper, append custom floating middleware to move dropdown follow mouse click */
const RefWrapper: React.FC<RefWrapperProps> = forwardRef<HTMLElement, RefWrapperProps>(
	(props, ref) => {
		const {children, refProp, ...others} = props;

		if (!isElement(children)) {
			throw new Error(
				'ContextMenu.Target component children should be an element or a component that accepts ref'
			);
		}

		const toggleDropdown = (e: React.MouseEvent) => {
			// ref of trigger should be an function
			if (typeof ref === 'function') {
				ref({
					getBoundingClientRect() {
						return {
							x: e.clientX,
							y: e.clientY,
							width: 0,
							height: 0,
							top: e.clientY,
							right: e.clientX,
							bottom: e.clientY,
							left: e.clientX,
						};
					},
				} as any);
				ctx.toggleDropdown(e);
			}
		};

		const ctx = useContextMenuContext();

		const onContextMenu = createEventHandler(
			children.props.onContextMenu,
			(e: React.MouseEvent) => {
				if (ctx.trigger === 'context') {
					e.preventDefault();
					toggleDropdown(e);
				}
			}
		);

		const onClick = createEventHandler(children.props.onClick, (e: React.MouseEvent) => {
			if (ctx.trigger === 'click') {
				toggleDropdown(e);
			}
		});

		return cloneElement(children, {
			...others,
			onClick,
			onContextMenu,
			[refProp]: ref,
		} as any);
	}
);

RefWrapper.displayName = 'ContextMenu/RefWrapper';

export const ContextMenuTarget = forwardRef<HTMLElement, MenuTargetProps>((props, ref) => {
	const {children, refProp = 'ref', ...others} = props;
	return (
		<Menu.Target {...others} refProp={refProp} ref={ref}>
			<RefWrapper refProp={refProp}>{children}</RefWrapper>
		</Menu.Target>
	);
});

ContextMenuTarget.displayName = 'ContextMenuTarget';
