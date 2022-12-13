export const CopyIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			{...props}
		>
			<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
			<rect x='8' y='8' width='12' height='12' rx='2'></rect>
			<path d='M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2'></path>
		</svg>
	);
};
