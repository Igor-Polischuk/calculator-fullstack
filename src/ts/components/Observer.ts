import { IObserver, ISubscriber } from '@customTypes/Observer';

export class Observer<N> implements IObserver<N> {

    constructor(
        private observers: ISubscriber[] = []
    ) {}

    subscribe<T extends ISubscriber>(observer: T) {
        this.observers.push(observer)
    };

    unsubscribe<T extends ISubscriber>(observer: T) {
        this.observers = this.observers.filter(o => o !== observer)
    };
    notify (data: N) {
        this.observers.forEach(observer => {
            observer.update(data)
        })
    }
}