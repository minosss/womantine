export const CopiedIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			width='1em'
			height='1em'
			{...props}
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
			<path d='M5 12l5 5l10 -10'></path>
		</svg>
	);
};
