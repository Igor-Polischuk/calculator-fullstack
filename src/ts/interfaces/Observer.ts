export interface IObserver{
    subscribe: <T extends ISubscriber>(observer: T) => void 
    unsubscribe: <T extends ISubscriber>(observer: T) => void 
    notify: <T>(data: T) => void
}

export interface ISubscriber{
    update: <T>(data: T) => void
}