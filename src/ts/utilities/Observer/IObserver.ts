export interface IEventMap {
    [event: string]: any;
}

export interface IObserverCallback<T> {
    (data: T): void;
}

export interface IObserverCallbacks {
    [event: string]: IObserverCallback<any>[]
}

export type EventKey<T> = keyof T & string;

export interface IObserver<T extends IEventMap> {
    subscribe: <K extends EventKey<T>>(event: K, callback: IObserverCallback<T[K]>) => IObserverCallback<T[K]>;
    unsubscribe: <K extends EventKey<T>>(event: K, callback: IObserverCallback<T[K]>) => void
}
