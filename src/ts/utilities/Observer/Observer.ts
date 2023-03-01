import { IEventMap, IObserver, IObserverCallback, IObserverCallbacks, ISubscribeOptions } from './IObserver';


// type AllowedEventsKey<T extends IEventMap> = keyof T & string

export class Observer<AllowedEvents extends IEventMap> implements IObserver<IEventMap>{
    protected observers: IObserverCallbacks = {}

    subscribe<Keys extends keyof AllowedEvents & string>({ 
        event, 
        handler, 
        context = undefined }: ISubscribeOptions<Keys, IObserverCallback<AllowedEvents[Keys]>>) {
        const fn = context ? handler.bind(context) : handler
        if (Array.isArray(this.observers[event])) {
            this.observers[event].push(fn)
        } else {
            this.observers[event] = [fn]
        }
        return fn
    };

    unsubscribe<K extends keyof AllowedEvents & string>(event: K, callback: IObserverCallback<AllowedEvents[K]>) {
        if (Array.isArray(this.observers[event])) {
            this.observers[event] = this.observers[event].filter(fn => fn !== callback)
        }
    };

    protected notifyAll<K extends keyof AllowedEvents & string>(event: K, newData: AllowedEvents[K]) {
        this.observers[event].forEach(fn => fn(newData));
    }
}