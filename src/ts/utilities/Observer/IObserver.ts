export interface IEventMap {
    [event: string]: any;
}

export interface IObserverCallback<T> {
    (data: T): void;
}

export interface IObserverCallbacks {
    [event: string]: IObserverCallback<any>[]
}

export interface IObserver<T extends IEventMap> {
    subscribe: <K extends keyof T & string>(options: ISubscribeOptions<K, IObserverCallback<T[K]>>) => IObserverCallback<T[K]>
    unsubscribe: <K extends keyof T & string>(event: K, callback: IObserverCallback<T[K]>) => void
}

export interface ISubscribeOptions<Event, Callback> {
    event: Event
    handler: Callback
    context?: undefined | object
}