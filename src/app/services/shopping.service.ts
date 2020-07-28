import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Item } from '../../model/Item';

import { StorageService } from './storage.service'


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(
    private http: HttpClient, private messageService: MessageService, private storageService: StorageService
  ) { }
  private baseUrl = 'http://localhost:4000';  // URL to web api

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/products`).pipe(
      catchError(this.handleError<Item[]>('getItems', [])))
  }




  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log(error.message);
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

