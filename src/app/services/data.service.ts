import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../models/person.model';
import { Observable, throwError} from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import {FormGroup, FormBuilder} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    personURL = 'http://localhost:8080/persons';
    captureForm: FormGroup;
    constructor(private formBuilder: FormBuilder, private httpClient: HttpClient){

    }
    getUsers(): Observable<Person[]> {
        return this.httpClient.get<Person[]>(this.personURL).pipe(
          retry(1),
          catchError(this.handleError)
        );
    }

    createUsers(body): Observable<Person>{
       return this.httpClient.post<Person>(this.personURL, body).pipe(
         retry(1),
         catchError(this.handleError)
       );
    }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = '\nNames may not contain special character and numbers \nA Valid South African ID number with 13 digits.';
    } else {
      // Get server-side error
      errorMessage = '\nNames may not contain special character and numbers \nA Valid South African ID number must be 13 digits.';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
