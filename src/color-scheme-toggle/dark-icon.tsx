export const DarkIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		stroke='currentColor'
		fill='none'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		width='1em'
		height='1em'
		{...props}
	>
		<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
		<path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z'></path>
	</svg>
);
