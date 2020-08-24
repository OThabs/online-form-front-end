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
        return this.httpClient.get<Person[]>(this.personURL);
    }

    createUsers(body): Observable<Person>{
       return this.httpClient.post<Person>(this.personURL, JSON.stringify(body));
    }
}
