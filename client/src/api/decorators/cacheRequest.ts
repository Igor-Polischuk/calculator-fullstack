import { RestAPI } from "api/RestAPI";
import { Cache } from "@utilities/Cache/Cache";

interface ICacheParams {
    ttl: number
}

export function cacheRequest(params: ICacheParams) {
    return function (target: RestAPI<any>, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const url = target.constructor().baseURL
        const cache = new Cache(url)

        descriptor.value = async function (...args: any[]) {
            const cacheKey = `${url}::${propertyKey}::${args}`

            if (cache.hasItem(cacheKey)) {
                return cache.getItem(cacheKey)!
            }

            const result = await originalMethod.apply(this, args);

            cache.setItem({
                key: cacheKey,
                value: result,
                ttl: params.ttl
            })

            return result;
        }
        return descriptor;
    }
}