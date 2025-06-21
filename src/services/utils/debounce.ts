export function debounce<TFunc extends (...args: any[]) => any>(func:TFunc, delay: number): (...args: Parameters<TFunc>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    return function(this: ThisParameterType<TFunc>, ...args: Parameters<TFunc>): void {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
        func.apply(context, args);
        }, delay);
    }
}