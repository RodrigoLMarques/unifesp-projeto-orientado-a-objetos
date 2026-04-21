import { IObserver } from "./IObserver";

export abstract class Subject<T> {
  private observers: IObserver<T>[] = [];

  addObserver(observer: IObserver<T>): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IObserver<T>): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  protected notifyObservers(data: T): void {
    this.observers.forEach((o) => o.update(data));
  }
}
