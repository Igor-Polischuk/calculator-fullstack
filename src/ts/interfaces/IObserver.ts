export interface IObserver<N>{
    subscribe: <T extends ISubscriber>(observer: T) => void 
    unsubscribe: <T extends ISubscriber>(observer: T) => void 
    notifyAll: (data: N) => void
}

export interface ISubscriber{
    update: Function
}

export interface IObserverConfig{
    [observerName: string]: IObserver<any>
}