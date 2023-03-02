import { IEventMap, IObserver, IObserverCallback, IObserverCallbacks, EventKey } from './IObserver';

export class Observer<EventsTypes extends IEventMap> implements IObserver<IEventMap>{
    
    protected observers: IObserverCallbacks = {}

    subscribe<Key extends EventKey<EventsTypes>>(event: Key, callback: IObserverCallback<EventsTypes[Key]>) {
        (this.observers[event] || (this.observers[event] = [])).push(callback);
        return callback
    };

    unsubscribe<Key extends EventKey<EventsTypes>>(event: Key, callback: IObserverCallback<EventsTypes[Key]>) {
        this.observers[event] = this.observers[event]?.filter(fn => fn !== callback)
    };

    protected notifyAll<Key extends EventKey<EventsTypes>>(event: Key, newData: EventsTypes[Key]) {
        this.observers[event]?.forEach(fn => fn(newData));
    }
}