interface ISetParams {
    key: string
    value: unknown
    ttl?: number
}

export class Cache {
    private cacheName: string
    private cacheObject: Record<string, { expires: number, value: unknown }>

    constructor(cacheName: string) {
        this.cacheName = cacheName
        this.cacheObject = JSON.parse(localStorage.getItem(this.cacheName) || '{}')
        this.removeOld()
    }

    hasItem(key: string): boolean {
        const cacheItem = this.cacheObject[key]

        if (!cacheItem || cacheItem.expires < Date.now()) {
            return false
        }

        return true
    }

    setItem({ key, value, ttl }: ISetParams): void {
        const expires = ttl ? Date.now() + ttl : Date.now()

        const cache: typeof this.cacheObject = {
            ...this.cacheObject, [key]: {
                expires,
                value
            }
        }

        localStorage.setItem(this.cacheName, JSON.stringify(cache))
        this.cacheObject = cache
    }

    getItem<DataType>(key: string): DataType | null {
        return this.hasItem(key) ? this.cacheObject[key].value as DataType : null
    }

    private removeOld(): void {
        Object.keys(this.cacheObject).forEach(cacheKey => {
            const currentItem = this.cacheObject[cacheKey]

            if (currentItem.expires < Date.now()) {
                delete this.cacheObject[cacheKey]
            }
        })

        localStorage.setItem(this.cacheName, JSON.stringify(this.cacheObject))
    }
}