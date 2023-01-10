import {Loader, Switch, SwitchProps} from '@mantine/core';
import {useUncontrolled} from '@mantine/hooks';
import {useState} from 'react';

export interface AsyncSwitchProps extends Omit<SwitchProps, 'onChange'> {
	/** the async function to do something, checked will recover when the action throw error */
	actionFn?(value: boolean): any;

	/** trigger if checked update */
	onChange?(value?: boolean): void;

	/** immediate change checked value, false by default */
	immediately?: boolean;

	/** display error message, false by default */
	withError?: boolean;
}

export function AsyncSwitch(props: AsyncSwitchProps) {
	const {
		children,
		actionFn,
		immediately = true,
		withError = false,
		checked: checkedProp,
		onChange,
		defaultChecked,
		...others
	} = props;

	// controll checked value, and unwrap onChange handler
	const [checked, setChecked] = useUncontrolled({
		value: checkedProp,
		defaultValue: defaultChecked,
		onChange,
	});

	// state of running action
	const [loading, setLoading] = useState(false);

	// display error message
	const [error, setError] = useState<string>();

	const trySwitchValue = async (newChecked: boolean) => {
		try {
			setError(undefined);
			if (immediately) {
				setChecked(newChecked);
			}
			setLoading(true);
			await actionFn?.(newChecked);
			if (!immediately) {
				setChecked(newChecked);
			}
		} catch (err) {
			if (withError) {
				setError(err.message);
			}
			setChecked(!newChecked);
		}
		setLoading(false);
	};

	return (
		<Switch
			{...others}
			checked={checked}
			onChange={(e) => trySwitchValue(e.currentTarget.checked)}
			thumbIcon={loading ? <Loader size={12} /> : undefined}
			error={error}
		>
			{children}
		</Switch>
	);
}
