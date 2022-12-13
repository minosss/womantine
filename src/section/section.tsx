import {Box, createPolymorphicComponent, DefaultProps, packSx} from '@mantine/core';
import {forwardRef} from 'react';

export interface SectionProps extends DefaultProps {
	children?: React.ReactNode;

	grow?: boolean;
}

export const _Section = forwardRef<HTMLDivElement, SectionProps>(
	({children, grow = false, sx, ...others}, ref) => {
		return (
			<Box
				ref={ref}
				sx={[
					{
						flex: grow ? 1 : 0,
						boxSizing: 'border-box',
					},
					...packSx(sx),
				]}
				{...others}
			>
				{children}
			</Box>
		);
	}
);

_Section.displayName = 'Section';

export const Section = createPolymorphicComponent<'div', SectionProps>(_Section);
