type setLoadingFunctionType = (loading: boolean) => void

export function setLoading(setLoadingFunctions: setLoadingFunctionType[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            setLoadingFunctions.forEach(fn => {
                fn(true)
            })

            const result = originalMethod.apply(this, args);

            setLoadingFunctions.forEach(fn => {
                fn(false)
            })
            return result;
        }
        return descriptor;
    }
}