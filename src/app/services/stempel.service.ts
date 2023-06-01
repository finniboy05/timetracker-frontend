import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { Stempel } from '../dataaccess/stempel';

@Injectable({
  providedIn: 'root'
})
export class StempelService {

  readonly backendUrl = 'Stempel';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Stempel[]> {
    return this.http.get<Stempel[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Stempel> {
    return this.http.get<Stempel>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(Stempel: Stempel): Observable<Stempel> {
    return this.http.put<Stempel>(environment.backendBaseUrl + this.backendUrl + `/${Stempel.id}`, Stempel);
  }

  public save(Stempel: Stempel): Observable<Stempel> {
    return this.http.post<Stempel>(environment.backendBaseUrl + this.backendUrl, Stempel);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
