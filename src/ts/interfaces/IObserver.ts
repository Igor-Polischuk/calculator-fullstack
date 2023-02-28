export interface IObserver {
    subscribe: (event: string, callback: Function) => void
    unsubscribe: (event: string, callback: Function) => void
}