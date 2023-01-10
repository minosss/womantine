import React from 'react';
import {createContext} from '~/utils';
import {TriggerEvent} from './types';

interface ContextMenuContext {
	lastEventRef: React.MutableRefObject<React.MouseEvent>;
	toggleDropdown(e: React.MouseEvent): void;
	trigger?: TriggerEvent;
}

export const [ContextMenuProvider, useContextMenuContext] = createContext<ContextMenuContext>({
	name: 'ContextMenuContext',
});
