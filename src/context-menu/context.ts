import {createSafeContext} from '@mantine/utils';
import {TriggerEvent} from './types';

interface ContextMenuContext {
	toggleDropdown(): void;
	trigger?: TriggerEvent;
}

export const [ContextMenuProvider, useContextMenuContext] = createSafeContext<ContextMenuContext>(`ContextMenuContext is undefined`);
