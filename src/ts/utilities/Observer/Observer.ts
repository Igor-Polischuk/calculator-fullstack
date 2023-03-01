import { IEventMap, IObserver, IObserverCallback, IObserverCallbacks } from './IObserver';


// type AllowedEventsKey<T extends IEventMap> = keyof T & string

export class Observer<AllowedEvents extends IEventMap> implements IObserver<IEventMap>{
    protected observers: IObserverCallbacks  = {}

   subscribe<K extends keyof AllowedEvents & string>(event: K, callback: IObserverCallback<AllowedEvents[K]>) {
        if (Array.isArray(this.observers[event])) {
            this.observers[event].push(callback)
        } else {
            this.observers[event] = [callback]
        }
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