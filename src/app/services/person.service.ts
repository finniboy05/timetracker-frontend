import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Person } from '../data/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly backendUrl = 'person';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.backendBaseUrl + this.backendUrl);
  }
}
