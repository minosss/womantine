type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

export function callHandlers<T extends (...args: any) => void>(...fns: (T | undefined)[]) {
	return function func(...args: Args<T>) {
		return fns.some((fn) => {
			return fn?.apply(fn, args) === false;
		});
	};
}
