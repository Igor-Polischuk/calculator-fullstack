import { IObserver, ISubscriber } from '@customTypes/Observer';

export class Observer implements IObserver {

    constructor(
        private observers: ISubscriber[] = []
    ) {}

    subscribe<T extends ISubscriber>(observer: T) {
        this.observers.push(observer)
    };

    unsubscribe<T extends ISubscriber>(observer: T) {
        this.observers.filter(o => o !== observer)
    };
    notify <T>(data: T) {
        this.observers.forEach(observer => {
            observer.update(data)
        })
    }
}