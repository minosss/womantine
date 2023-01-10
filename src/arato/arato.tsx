import {Alert, AlertProps, useComponentDefaultProps} from '@mantine/core';
import {useId, useLocalStorage} from '@mantine/hooks';
import {ForwardRefWithStaticComponents} from '@mantine/utils';
import {forwardRef} from 'react';
import {callHandlers} from '../utils';

export interface AratoOptions
	extends Pick<AlertProps, 'color' | 'title' | 'children' | 'icon'> {}

export type AratoState = 'info' | 'error' | 'success' | 'warning';

export interface AratoProps extends Partial<AlertProps> {
	state?: AratoState;
	states?: Record<AratoState, AratoOptions>;
}

const defaultProps: Partial<AratoProps> = {
	state: 'info',
	states: {
		info: {color: 'blue', title: 'Alert', children: 'OK'},
		error: {color: 'red', title: 'Error', children: 'Something failed'},
		success: {color: 'green', title: 'Success', children: 'OK'},
		warning: {
			color: 'yellow',
			title: 'Warning',
			children: 'Something went wrong',
		},
	},
};

const _Arato = forwardRef<HTMLDivElement, AratoProps>((props, ref) => {
	const {state, states, id, ...others} = useComponentDefaultProps(
		'Arato',
		defaultProps,
		props
	);
	const uid = useId(id);
	const [close, setClose] = useLocalStorage({key: `arato-${uid}`, defaultValue: false});

	const mergedStates = {...defaultProps.states, ...states};
	const options = mergedStates[state];

	const _props = {...options, ...others};
	const handleClose = callHandlers(_props.onClose, () => {
		setClose(true);
	});

	if (close) return null;
	return <Alert {..._props} onClose={handleClose} ref={ref}></Alert>;
});

_Arato.displayName = 'Arato';

function createArato(state: AratoState) {
	return function AratoAlert(props: AratoProps) {
		return <_Arato {...props} state={state} />;
	};
}

type AratoAlert = ReturnType<typeof createArato>;

export const Arato = _Arato as unknown as ForwardRefWithStaticComponents<
	AratoProps,
	{
		Info: AratoAlert;
		Error: AratoAlert;
		Warning: AratoAlert;
		Success: AratoAlert;
	}
>;

Arato.Info = createArato('info');
Arato.Error = createArato('error');
Arato.Warning = createArato('warning');
Arato.Success = createArato('success');
