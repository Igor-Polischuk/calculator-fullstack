export interface IObserver<N>{
    subscribe: <T extends ISubscriber>(observer: T) => void 
    unsubscribe: <T extends ISubscriber>(observer: T) => void 
    notify: (data: N) => void
}

export interface ISubscriber{
    update: Function
}