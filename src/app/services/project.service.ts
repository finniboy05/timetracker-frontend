import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { Project } from '../data/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  readonly backendUrl = 'project';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Project[]> {
    return this.http.get<Project[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Project> {
    return this.http.get<Project>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(Project: Project): Observable<Project> {
    return this.http.put<Project>(environment.backendBaseUrl + this.backendUrl + `/${Project.id}`, Project);
  }

  public save(Project: Project): Observable<Project> {
    return this.http.post<Project>(environment.backendBaseUrl + this.backendUrl, Project);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
