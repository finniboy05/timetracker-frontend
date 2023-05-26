import { Injectable } from '@angular/core';
import {DataElement} from "../data/data-element";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataElements: DataElement[] = [
    {
      id: 0,
      color: 'red'
    },
    {
      id: 1,
      color: 'blue'
    },
    {
      id: 2,
      color: 'green'
    },
    {
      id: 3,
      color: 'yellow'
    }
  ];

  private dataElementsSubject: BehaviorSubject<DataElement[]> = new BehaviorSubject(this.dataElements);
  public readonly dataElementsObservable: Observable<DataElement[]> = this.dataElementsSubject.asObservable();

  public deleteElement(id: number) {
    const data = this.dataElementsSubject.getValue();
    data.forEach((item, index) => {
      if (item.id === id) { data.splice(index, 1); }
    });
    this.dataElementsSubject.next(data);
  }

  public addRandomElement() {
    const data = this.dataElementsSubject.getValue();

    const r = this.getRandomNumber(1, 255);
    const g = this.getRandomNumber(1, 255);
    const b = this.getRandomNumber(1, 255);

    const newElement: DataElement = {
      id: data.length,
      color: `rgb(${r}, ${g}, ${b})`
    }

    data.push(newElement);
    this.dataElementsSubject.next(data);
  }

  getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
