import { IObserver } from '@customTypes/IObserver';

interface IObservers {
    [event: string]: Function[]
}

export class Observer implements IObserver{
    protected observers: IObservers = {}

    subscribe(event: string, callback: Function) {
        if(Array.isArray(this.observers[event])){
            this.observers[event].push(callback)
        }else{
            this.observers[event] = [callback]
        }
    };

    unsubscribe(event: string, callback: Function) {
        this.observers[event] = this.observers[event].filter(fn => fn !== callback)
    };
    protected notifyAll (event: string, newData: any) {
        this.observers[event].forEach(fn => fn(newData))
    }
}