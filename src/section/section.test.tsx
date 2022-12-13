import {render} from '@testing-library/react';
import {Section} from './section';

describe('/components/section', () => {
	it('sets grow prop', () => {
		const {container: section} = render(<Section>test</Section>);
		const {container: growSection} = render(<Section grow>test</Section>);

		expect(section.querySelector('div')).toHaveStyle({flex: 0});
		expect(growSection.querySelector('div')).toHaveStyle({flex: 1});
	});
});
