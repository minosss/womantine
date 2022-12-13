import {render} from '@testing-library/react';
import {Fullsize} from './fullsize';

describe('/components/fullsize', () => {
	it('sets position prop', () => {
		const {container: fullsize} = render(<Fullsize>test</Fullsize>);
		const {container: fixedFullsize} = render(<Fullsize position='fixed'>test</Fullsize>);

		expect(fullsize.querySelector('div')).toHaveStyle({
			position: 'absolute',
			width: '100%',
			height: '100%',
		});

		expect(fixedFullsize.querySelector('div')).toHaveStyle({
			position: 'fixed',
			width: '100%',
			height: '100%',
		});
	});

	it('supports custom styles with sx', () => {
		const {container: fullsize} = render(
			<Fullsize
				sx={{
					width: '50%',
					height: '50%',
				}}
			>
				test
			</Fullsize>
		);

		expect(fullsize.querySelector('div')).toHaveStyle({width: '50%', height: '50%'});
	});
});
