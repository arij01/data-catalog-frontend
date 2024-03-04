import { Injectable } from '@angular/core';
import { Column } from '../model/columns';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Label } from '../model/label';
import { Documentation } from '../model/documentation';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: string = 'http://localhost:8081/api/columns'

  constructor(private http: HttpClient) { }

  public getAllColumns(): Observable<Column[]> {

    return this.http.get<Column[]>(this.url);
  }
  public addColumn(Column: Column) {

    return this.http.post<Column>(this.url+'/create', Column);
  }
  public getColumnById(id: string) {
    return this.http.get<Column>(this.url + '/getById/' + id);
  }
  public updateColumnById(id: string, column: Column) {
    return this.http.put<Column>(this.url + '/edit/' + id, column);
  }
  public deleteColumn(id: string) {
    return this.http.delete<Column>(this.url + '/delete/' + id);
  }
  searchColumns(label: Label): Observable<Column[]> {
    return this.http.get<Column[]>(this.url +'/search/'+label);
  }
  public getAlL(): Observable<Column[]> {
    return this.http.get<Column[]>(this.url+'/all')
      .pipe(
        map(columns => columns.map(column => ({
          ...column,
          nom: column.nom || '(none)',
        })))
      );
  }




}
