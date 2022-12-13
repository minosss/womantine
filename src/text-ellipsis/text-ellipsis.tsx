import React from 'react';
import {
	ActionIcon,
	Box,
	CopyButton,
	packSx,
	Text,
	TextProps,
	Tooltip,
	useComponentDefaultProps,
	useMantineTheme,
} from '@mantine/core';
import {CopiedIcon} from './copied-icon';
import {CopyIcon} from './copy-icon';

interface TextEllipsisProps extends Omit<TextProps, 'children'> {
	withCopy?: boolean;
	children?: string;
	labels?: Record<'copy' | 'copied', string>;
	iconSize?: string | number;
}

const defaultProps: Partial<TextEllipsisProps> = {
	withCopy: false,
	labels: {copied: 'Copied', copy: 'Copy'},
	iconSize: 'md',
};

const iconSizes = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 20,
	xl: 24,
};

export function createTextEllipsis(lineClamp = 1) {
	function TextEllipsis(props: TextEllipsisProps) {
		const {children, withCopy, sx, iconSize, labels, ...others} = useComponentDefaultProps(
			'TextEllipsis',
			defaultProps,
			props
		);

		const theme = useMantineTheme();
		const _iconSize = theme.fn.size({size: iconSize, sizes: iconSizes});

		return (
			<Box component='span' sx={{display: 'flex', alignItems: 'center'}}>
				<Text
					title={typeof children === 'string' ? children : undefined}
					{...others}
					lineClamp={lineClamp}
					component='span'
					sx={{
						wordBreak: 'break-word',
						whiteSpace: 'pre-wrap',
						...packSx(sx),
					}}
				>
					{children}
				</Text>
				{withCopy && children !== undefined && (
					<CopyButton value={children}>
						{({copied, copy}) => (
							<Tooltip
								label={copied ? labels.copied : labels.copy}
								withArrow
								position='right'
							>
								<ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
									{copied ? (
										<CopiedIcon width={_iconSize} height={_iconSize} />
									) : (
										<CopyIcon width={_iconSize} height={_iconSize} />
									)}
								</ActionIcon>
							</Tooltip>
						)}
					</CopyButton>
				)}
			</Box>
		);
	}

	return TextEllipsis;
}

export const OneLineClamp = createTextEllipsis(1);
export const TwoLinesClamp = createTextEllipsis(2);
