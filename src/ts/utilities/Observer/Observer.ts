import { IEventMap, IObserver, IObserverCallback, IObserverCallbacks, EventKey } from './IObserver';

export class Observer<EventsTypes extends IEventMap> implements IObserver<IEventMap>{
    
    protected observers: IObserverCallbacks = {}

    subscribe<EventName extends EventKey<EventsTypes>>(event: EventName, callback: IObserverCallback<EventsTypes[EventName]>) {
        (this.observers[event] || (this.observers[event] = [])).push(callback);
        return callback
    };

    unsubscribe<EventName extends EventKey<EventsTypes>>(event: EventName, callback: IObserverCallback<EventsTypes[EventName]>) {
        this.observers[event] = this.observers[event]?.filter(fn => fn !== callback)
    };

    protected notifyAll<EventName extends EventKey<EventsTypes>>(event: EventName, newData: EventsTypes[EventName]) {
        this.observers[event]?.forEach(fn => fn(newData));
    }
}