import {Box, createPolymorphicComponent, CSSObject, DefaultProps, packSx} from '@mantine/core';
import {forwardRef} from 'react';

export interface FullsizeProps extends DefaultProps {
	children: React.ReactNode;
	position?: CSSObject['position'];
}

export const _Fullsize = forwardRef<HTMLDivElement, FullsizeProps>(
	({children, position = 'absolute', sx, ...others}, ref) => (
		<Box
			ref={ref}
			sx={[
				{
					boxSizing: 'border-box',
					position,
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				},
				...packSx(sx),
			]}
			{...others}
		>
			{children}
		</Box>
	)
);

_Fullsize.displayName = 'Fullsize';

export const Fullsize = createPolymorphicComponent<'div', FullsizeProps>(_Fullsize);
