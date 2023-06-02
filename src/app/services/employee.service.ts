import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { Employee } from '../data/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly backendUrl = 'employee';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Employee> {
    return this.http.get<Employee>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(Employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(environment.backendBaseUrl + this.backendUrl + `/${Employee.id}`, Employee);
  }

  public save(Employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(environment.backendBaseUrl + this.backendUrl, Employee);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
