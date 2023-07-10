import 'babel-polyfill';

export const throttle = (func, wait) => {
    let context, args, prevArgs, argsChanged, result;
    let previous = 0;

    return function () {
        let now, remaining;
        if (wait) {
            now = Date.now();
            remaining = wait - (now - previous);
        }

        context = this;
        args = arguments;
        argsChanged = JSON.stringify(args) !== JSON.stringify(prevArgs);
        prevArgs = Object.assign({}, args);

        if (argsChanged || (wait && (remaining <= 0 || remaining > wait))) {
            if (wait) {
                previous = now;
            }

            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};

export function convert(containerClass) {
    const tmp = containerClass;
    containerClass = function (...args) {
        return new tmp(...args);
    };
    containerClass.prototype = tmp.prototype;
    containerClass.getStores = tmp.getStores;
    containerClass.calculateState = tmp.calculateState;
    return containerClass;
}
