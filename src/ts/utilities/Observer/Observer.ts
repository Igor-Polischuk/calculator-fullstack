import { IEventMap, IObserver, IObserverCallback, IObserverCallbacks, EventKey } from './IObserver';

/**
 * A generic observer class to handle event subscription, unsubscription and notification.
 * @template EventsTypes An interface that maps event names to their data types.
 */
export class Observer<EventsTypes extends IEventMap> implements IObserver<IEventMap>{
    /**
     * A dictionary of event callbacks, where the keys are the event names and the values are arrays of callback functions.
     * @protected
     */
    protected observers: IObserverCallbacks = {}

    /**
     * Subscribes a callback function to an event.
     * @template EventName The name of the event to subscribe to.
     * @param event The name of the event to subscribe to.
     * @param callback The callback function to be executed when the event is triggered.
     * @returns  The callback function that was subscribed.
     */
    subscribe<EventName extends EventKey<EventsTypes>>
        (event: EventName, callback: IObserverCallback<EventsTypes[EventName]>): IObserverCallback<EventsTypes[EventName]> {
        (this.observers[event] || (this.observers[event] = [])).push(callback)
        return callback
    }


    /**
     * Unsubscribes a callback function from an event.
     * @template EventName The name of the event to unsubscribe from.
     * @param event The name of the event to unsubscribe from.
     * @param callback The callback function to be unsubscribed.
     */
    unsubscribe<EventName extends EventKey<EventsTypes>>(event: EventName, callback: IObserverCallback<EventsTypes[EventName]>): void {
        this.observers[event] = this.observers[event]?.filter(fn => fn !== callback)
    }

    /**
     * Notifies all subscribed callbacks for an event.
     * @template EventName The name of the event to notify for.
     * @param event The name of the event to notify for.
     * @param newData The data to pass to the callbacks.
     */
    protected notifyAll<EventName extends EventKey<EventsTypes>>(event: EventName, newData: EventsTypes[EventName]): void {
        this.observers[event]?.forEach(fn => fn(newData));
    }
}